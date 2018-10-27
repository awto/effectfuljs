/** 
 * implicit parallelization
 * detecting and injecting Applicative functor based combinators 
 */
import * as Kit from "./kit"
import {Tag} from "./kit"
import * as Block from "./block"
import * as Bind from "./bind"
import * as assert from "assert"
import * as Ctrl from "./control"
import * as State from "./state"

export const shareId = Kit.sysId("share")
export const forkId = Kit.sysId("fork")

/** interpr value for thread local vars */
export const threadLocal = {$:"tl",frameLocal:false}

/** 
 * returns edges for variables dependencies
 *
 *  type Node = Node & {fv:Set<Sym>, bv:Set<Sym>} 
 */
function nodeVars(node) {
  const fv = node.fv = new Set()
  const bv = node.bv = new Set()
  if (node.skip) {
    travFrames(new Set(), node.value[0], node.after)
  } else {
    for(const i of node.value.content) {
      if (i.enter) {
        switch(i.type) {
        case Block.letStmt:
          if (i.value.sym)
            bv.add(i.value.sym)
          break
        case Tag.Identifier:
          const sym = i.value.sym
          if (!i.value.sym)
            break
          if (i.value.opts.parAllLocals) {
            fv.add(sym)
            bv.add(sym)
          } else {
            if (i.value.rhs && !bv.has(sym))
              fv.add(sym)
            if (i.value.lhs)
              bv.add(sym)
          }
          break
        case Block.bindPat:
          fv.add(i.value.sym)
          break
        }
      }
    }
  }
  function travFrames(inited, frame, stop) {
    const sw = frame.stateVars
    for(const i of sw.r) {
      if (!inited.has(i))
        fv.add(i)
    }
    sw.w.forEach(bv.add,bv)
    if (frame.exits.size === 1) {
      const [exit] = frame.exits
      if (exit.goto === stop || exit.rec)
        return
      sw.w.forEach(inited.add,inited)
      travFrames(inited, exit.goto, stop)
    } else {
      for(const i of frame.exits) {
        const nInited = new Set(inited)
        if (i.rec)
          continue
        travFrames(nInited, i.goto, stop)
      }
    }
  }
}

/** 
 * returns list of edges built by fv/bv dependencies in nodes chain 
 *
 *    type Edge = [Node, Node]
 *
 *  @param {Node[]} nodes
 *  @returns {Edge[]} 
 */
function edgesByVars(nodes) {
  const bv = new Map()
  const res = []
  for(const dst of nodes) {
    for(const i of dst.fv) {
      const src = bv.get(i)
      if (src)
        res.push([src,dst])
    }
    for(const i of dst.bv) {
      bv.set(i, dst)
    }
  }
  return res
}

/** 
 * takes list of nodes and builds a dependecy graph (grouped by src)
 * the graph is topologically sorted, next nodes don't depend on previous
 *
 *   type Graph = [Node, Node[]][]
 */
function buildGraph(nodes,edges) {
  const res = nodes.map(dst => [dst,[]])
  const map = new Map(res)
  for(const [src,dst] of edges) {
    map.get(dst).push(src)
  }
  return res
}

/**
 * returns the resulting graph (type is recursive)
 *
 * Input deps graph saying computation in `src` uses `dst`s (no trans clos)
 * 
 *    graph: {src: Node, dst: Node[]}
 *
 *  Each node specifies threads join 
 *
 *    type Thread = {
 *      // unique thread's id
 *      id: number,
 *      // thread's rank in dependencies DAG
 *      rank: number,
 *      // threads to join (parallel if more than 1)
 *      // nothing on left means the thread starts with the function
 *      left: Thread[],
 *      // sequence of ops to run after the join
 *      // i.e. the ops running in the thread
 *      right: Node[],
 *      steps: Step[] 
 *      // the threads's reference counter
 *      rc: number,  
 *      // first: FrameVal, === frames[0].exit
 *      reff: boolean        // right is effectful
 *      // nodes available after this node is computed
 *      // so the node itself and the ones it depends on
 *      scope: Set<Node>,
 *      // last frame for this thread (usually contains `join` in its exit)
 *      lastStep: Step,
 *      // transitive closure of deps in left
 *      closLeft: Set<Thread>,
 *      // threads which may run in parallel with this one
 *      parThreads: Set<Thread>,
 *      // vars written/read by this thread
 *      w, r: Set<Symbol>
 *    }
 * 
 *    type Step = {
 *      skip: false
 *      // exit from the frame, 
 *      // we can parallelize only single exits frame
 *      // so it should be one
 *      exit: LetVal,
 *      frame: FrameVal,
 *      // content if it is a new frame or `false`
 *      // false if the frame is already in the input
 *      // i.e. a frame with a fork
 *      toks: TokVal[] | false,
 *    } | {
 *      skip: true,
 *      // prefix
 *      toks: false,
 *      value: FrameVal[],
 *      after: FrameVal 
 *    }
 *
 *    type ForkExpr = {
 *        // reference counter
 *        rc: number
 *      } & ({
 *        fork: true,
 *        // the fork joins into this thread
 *        join: Thread,
 *        tup: ForkExpr[]
 *      } | {
 *        fork: false,
 *        value: ThreadVal
 *      })
 *
 *  if letStmt can be parallelized:
 * 
 *   type TokVal = Val & { content: Token[] }
 *
 *   type RootVal = RootVal & { 
 *     parDefs: Thread[][],
 *     // new frames content
 *     parFrames: Token[][],
 *     // variables requiring copies after changing
 *     parThreadLocalVars: Set<Symbol> }
 * 
 */
function deriveBlocks(graph, s, root) {
  const nodes = []
  let threads = [] //: Thread[]
  let id = 0
  const {errFrameRedir,resFrameRedir,resFrame,pureExitFrame} = root
  /** first letStmt stays in same frame, other frames are rebuilt */
  const first = graph[0][0]
  const last = graph[graph.length-1][0]
  const exitGoto = last.skip ? last.after : last.value.goto
  exitGoto.required = true
  /**
   * ## Calculating initial threads graph from dependencies graph
   */
  for(const [src,dests] of graph) {
    let cur
    if (dests.length) {
      const opts = getOpts(dests)
      let value, scope
      for(const curValue of opts) {
        const curScope = new Set([].concat(...curValue.map(i => [...i.scope])))
        if (value) {
          if (curScope.size > scope.size)
            continue
          if (curScope.size === scope.size && curValue.length > value.length)
            continue
        }
        scope = curScope
        value = curValue
      }
      if (!value)
        throw new Error("INTERNAL: error on par")
      scope.add(src)
      cur = {scope,left:value,right:[src]}
    } else {
      cur = {scope:new Set([src]),left:[],right:[src]}
    }
    cur.id = id++
    cur.rc = 0
    threads.push(cur)
  }
  /**
   * pre-calculating thread reference counts and if it has effectful parts,
   * the pure only threads aren't interesting they are merged with corresp.
   * effectful ones in next stage
   */
  for(const i of threads) {
    for(const j of i.left)
      ++j.rc
    let reff = false
    for(const j of i.right) {
      if (j.skip || j.value.fbound) {
        reff = true
        break
      } 
    }
    i.reff = reff
  }
  /**
   * ## Reducing the graph
   *
   * ### pure threads before effectful are ok to merge
   */
  for(const i of threads) {
    const eleft = []
    for(const j of i.left) {
      if (j.reff || j.rc !== 1) {
        eleft.push(j)
      } else {
        i.right.unshift(...j.right)
        eleft.push(...j.left)
        j.removed = true
      }
    }
    i.left = eleft
  }
  threads = threads.filter(i => !i.removed)
  /**
   * ### merging serialized threads (running sequentially anyway)
   */
  for(const i of threads) {
    if (i.left.length === 1) {
      const [l] = i.left
      if (l.rc === 1) {
        l.remove = true
        i.right.unshift(...l.right)
        i.left = l.left
      }
    }
  }
  threads = threads.filter(i => !i.remove)

  /**
   * nothing to run in parallel here (giving up)
   */
  if (threads.length === 1)
    return false
  /**
   * Splitting threads back into frames (steps)
   */
  for(const i of threads) {
    let toks = []
    let lastExit
    const steps = i.steps = []
    for(const j of i.right) {
      if (j.skip) {
        const frame = j.value[0]
        if (toks.length) {
          const declSym = Kit.scope.newSym("_")
          const ref = s.tok(Tag.push, Block.frame,
                            {declSym,savedDecls:new Map(),
                               resFrameRedir,catchContRedir:errFrameRedir}).value
          const next = {toks,
                        skip:false,
                        frame:ref,
                        exit:s.tok(Tag.push,Ctrl.jump,
                                   {goto:frame,
                                    ref,
                                    gotoDests:[frame],
                                    insideCtx:true,last:true})}
          steps.push(next)
          toks.push({content:[next.exit]})
          toks = []
        }
        lastExit = null
        steps.push({toks:false,skip:true,value:j.value,frame,after:j.after})
        continue
      }
      toks.push(j.value)
      /** # frame bounds - injecting new frame */
      if (j.value.fbound) {
        lastExit = j.value
        const declSym = Kit.scope.newSym("_")
        const frame = s.tok(Tag.push, Block.frame,
                            {declSym,savedDecls:new Map(),
                             resFrameRedir,errFrameRedir}).value
        steps.push({toks,skip:false,exit:j.value,frame})
        toks = []
      }
    }
    const last = {toks}
    steps.push(last)
    /**  
     * if there are some not-eff toks left or it binds some var
     * we are to add another frame with the pure code and join
     */
    if (toks.length || (lastExit && lastExit.sym && lastExit.sym.bound)) {
      const declSym = Kit.scope.newSym("_")
      const frame = s.tok(Tag.push, Block.frame,
                          {declSym,savedDecls:new Map(),
                           resFrameRedir,catchContRedir:errFrameRedir}).value
      const join = s.tok(Tag.push,Ctrl.jump,
                         {goto:pureExitFrame,
                          gotoDests:[pureExitFrame],
                          ref:frame,insideCtx:true,last:true})
      toks.push({content:[join]})
      last.exit = join.value
      last.frame = frame
      if (lastExit)
        lastExit.gotoDests = [lastExit.goto = frame]
      if (errFrameRedir)
        errFrameRedir.required = true
      if (resFrameRedir)
        resFrameRedir.required = true
      i.lastStep = last
    } else {
      last.toks = false
      last.exit = false
      last.frame = pureExitFrame
      i.lastStep = steps[steps.length-2]
    }
  }
  /**
   * Generating frame's boundaries and calculating parameters
   * it require (patSym, declSym etc)
   */
  for(const i of threads) {
    const steps = i.steps
    for(const j of steps) {
      const f = j.frame
      if (j.toks) {
        for(const k of j.toks) {
          if (!k.skip && k.ref)
            k.ref.removed = true
        }
      }
    }
    for(let j = 0, len = steps.length - 1; j < len; ++j) {
      const cur = steps[j]
      const next = steps[j+1]
      if (cur.skip) {
        for(const i of cur.after.enters)
          i.goto = next.frame
      } else
        cur.exit.goto = next.frame
      if (!cur.skip)
        next.frame.patSym = cur.exit.sym
    }
    i.rank = Math.max(0,...i.left.map(i => i.rank)) + 1
  }
  const firstFrame = first.skip ? first.value[0] : first.value.ref
  const head = s.tok(Tag.push, Block.frame,
                     {declSym:Kit.scope.newSym("_"),savedDecls:new Map(),
                      resFrameRedir:firstFrame.resFrameRedir,
                      catchContRedir:firstFrame.catchContRedir}).value
  for(const i of firstFrame.enters)
    i.goto = head
  /** generating expressions */
  for(const i of threads) {
    const join = {fork:false,rc:0,value:i,enter:i.steps[0].frame}
    if (i.left.length === 0) {
      i.expr = join
      continue
    }
    const tup = []
    for(const j of i.left) {
      assert.ok(j.expr)
      tup.push(j.expr)
      ++j.expr.rc
    }
    i.expr = {fork:true,rc:0,tup,join}
  }
  const tup = []
  for(const i of threads) {
    if (i.rc === 0)
      tup.push(i.expr)
  }
  root.parFrames.push([...emitFrames()])
  root.parDefs.push(threads)
  return true
  /**
   * gets all possible graph splittings calculating `dests`
   */
  function getOpts(dests/*:LetVal[]*/)/*: Thread[][] */ {
    const len = threads.length
    const res = []
    _bt(0, new Set(dests), [])
    return res
    function _bt(pos, dests, cur) {
      if (!dests.size) {
        if (cur.length)
          res.push(cur)
        return
      }
      if (pos === len)
        return
      const f = threads[pos]
      const next = new Set(dests)
      f.scope.forEach(next.delete,next)
      if (dests.size !== next.size)
        _bt(pos+1,next,[...cur,f])
      _bt(pos+1,dests,cur, res)
    }
  }
  /** sets destination for fork expression */
  function* emitFork(tup,joinFrame,tmpVar) {
    assert.ok(joinFrame)
    yield s.enter(Tag.push,Block.letStmt,{
      eff:true,reflected:tmpVar != null,goto:joinFrame,ref:head,tmpVar})
    if (tup.length > 1) {
      yield s.tok(Tag.push,Block.app,{result:false,sym:forkId,tup})
    } else {
      const [sub] = tup
      assert.ok(sub.tmpVar)
      yield s.tok(Tag.push,Tag.Identifier,{sym:sub.tmpVar})
      sub.tmpVar.parThread = true
    }
  }
  /** emits parallel frames */
  function* emitFrames() {
    yield s.enter(Tag.push,Block.frame,head)
    const lab = s.label()
    for(const i of threads) {
      const {expr} = i
      let tmpVar = expr.tmpVar = Kit.scope.newSym()
      head.savedDecls.set(tmpVar,{})
      tmpVar.shared = expr.rc > 1
      if (expr.fork) {
        yield* emitFork(expr.tup,expr.join.enter,tmpVar)
      } else {
        yield s.tok(Tag.push,Ctrl.jump,{
          ref:head,goto:expr.enter,reflected:true,tmpVar})
      }
      yield* lab()
    }
    yield* emitFork(tup,exitGoto)
    yield* lab()
    yield* s.leave()
    for(const i of threads) {
      const cw = i.conflicts
      for(const j of i.steps) {
        if (!j.skip && j.toks && !j.removed) {
          yield s.enter(Tag.push, Block.frame, j.frame)
          // TODO: wrap and copy!
          for(const l of j.toks)
            yield* l.content
          yield* s.leave()
        }
      }
    }
  }
}

export function emitForkApp(si) {
  const s = Kit.auto(si)
  const root = s.first.value
  if (!root.hasPar)
    return s
  const {resFrameRedir,pureExitFrame} = root
  return _emitFork()
  function* _emitFork() {
    for(const i of s) {
      if (i.enter) {
        switch(i.type) {
        case Block.effExpr:
          const {tmpVar} = i.value
          if (!tmpVar)
            break
          const la = s.cur()
          if (la.type !== Block.app || la.value.sym !== Block.pureId)
            break
          tmpVar.emptyThread = true
          Kit.skip(s.copy(i))
          continue
        case Block.app:
          if (i.value.sym === forkId) {
            const vars = []
            for(const {tmpVar:j} of i.value.tup) {
              assert.ok(j)
              if (!j.emptyThread)
                vars.push(j)
            }
            if (vars.length === 1) {
              yield s.tok(i.pos,Tag.Identifier,{sym:vars[0]})
            } else {
              const lab = s.label()
              yield s.enter(i.pos,i.type,i.value)
              yield s.enter(Tag.push,Tag.ArrayExpression)
              yield s.enter(Tag.elements,Tag.Array)
              for(const sym of vars) {
                yield s.tok(Tag.push,Tag.Identifier,{sym})
                sym.parThread = true
              }
              yield* lab()
            }
            s.close(i)
            continue
          }
          break
        }
      }
      yield i
    }
  }
}

/** 
 * calculates frame's chains which can be parallelized
 * 
 *    type PreNode = { skip:false, value: FrameVal }
 *      // sequence of frames which cannot be added to the chain
 *      // because of more than one exit or enter, or `parRegion:false`  
 *      //  * after - next frame going after - always should be one
 *      // its `enters` field refers all the exits in the skipped block
 *      | {skip:true, value:FrameVal[], after:FrameVal}
 *
 * each PreNode in the chain has exactly one enter from the previous link
 * and exactly one exit to the next link
 */
export function frameThreads(first,resFrame) {
  const chains = []
  _collect(first, null, [], new Map())
  return chains
  /**
   * frame, till: FrameVal 
   * skip: FrameVal[]
   */
  function _preCollect(frame, till, skip, recSkips) {
    let curSkip
    const res = []
    for(;frame && frame !== till;) {
      const {exits} = frame
      if (exits.size === 0)
        break
      const chain = [frame]
      for(const i of exits) {
        if (i.goto.dynamicJump)
          return res
        if (i.goto === frame) {
          i.recExit = true
          break
        }
        i.recExit = false
      }
      for(const i of frame.enters) {
        if (!i.rec)
          continue
        for(const j of exits) {
          if (j.goto === frame)
            continue
          if (j.goto.framesAfter.has(i.ref)) {
            j.recExit = true
            continue
          }
        }
      }
      const nonRecExits = []
      const recExits = []
      for(const i of exits) {
        (i.recExit ? recExits : nonRecExits).push(i)
      }
      if (recExits.length || nonRecExits.length > 1) {
        if (!curSkip)
          curSkip = []
        curSkip.push(frame)
      }
      if (recExits.length) {
        let nextSkip = []
        const nextRecSkips = new Map(recSkips)
        nextRecSkips.set(frame, nextSkip)
        for(const i of recExits)
          _collect(i.goto, null, nextSkip, nextRecSkips)
        curSkip.push(...nextSkip)
        nextSkip.unshift(frame)
      }
      skip.push(frame)
      if (nonRecExits.length === 1) {
        const [exit] = nonRecExits
        if (exit.opts.parRegion) {
          if (curSkip) {
            res.push({skip:true,value:curSkip})
            curSkip = null
          }
          if (recExits.length === 0)
            res.push({skip:false,value:frame})
          frame = exit.goto
        } else {
          if (!curSkip)
            curSkip = []
          curSkip.push(frame)
        }
        frame = exit.goto
        if (exit.rec) {
          const value = recSkips.get(frame)
          res.pop() // TODO: remove
          assert.ok(value)
          res.push({skip:true,value,after:resFrame})
          
          return res
        }
      } else {
        frame = _branchesJoin(nonRecExits)
        for(const i of nonRecExits)
          _collect(i.goto, frame, curSkip, recSkips)
      }
    }
    if (curSkip && frame) {
      res.push({skip:true,value:curSkip,after:frame})
    }
    return res
  }
  function _collect(frame, till, skip, recSkips) {
    const res = _preCollect(frame, till, skip, recSkips)
    if (res.length) {
      for(let i = 0, len = res.length, prev = res[0]; i < len; i++) {
        const cur = res[i]
        if (cur.skip) {
          const b = res[i-1], a = res[i+1]
          if (a)
            cur.after = a.value
          assert.ok((!b || !b.skip) && (!a || !a.skip))
        } else {
          prev = cur
        }
      }
      chains.unshift(res)
    }
  }
  function _branchesJoin(exits) {
    if (exits.length < 2)
      return null
    const [exit, ...rest] = exits
    for(const j of exit.goto.framesAfter) {
      if (rest.every(k => j === k.goto || k.goto.framesAfter.has(j)))
        return j
    }
    return null
  }
}

/**
 * Returns chain with Frame links unfolded to their operations
 *
 *  chain: PreNode[]
 *  type Node = {skip:false,value:Val} 
 *    | {skip:true,value:FrameVal[],after:FrameVal}
 *  returns Node[]
 */
function unfoldLinks(chain) {
  const res = []
  for(const i of chain) {
    if (i.skip) {
      res.push(i)
      continue
    }
    for(const j of i.value.steps)
      res.push({skip:false,value:j})
  }
  return res
}

function* substFrames(si) {
  const s = Kit.auto(Block.cleanup(si))
  const root = s.first.value
  let c
  for(c of s) {
    if (c.leave && c.type === Block.chain)
      break
    yield c
  }
  for(const frame of root.parFrames)
    yield* frame
  yield c
  yield* s
}

export function convert(si) {
  const sa = Kit.toArray(si)
  const s = Kit.auto(sa)
  const root = s.first.value
  root.hasPar = false
  if (!root.opts.par)
    return sa
  let hasAny = false
  if (!sa.some(i => i.enter && i.type === Block.letStmt
               && i.value.opts && i.value.opts.parRegion))
    return sa
  State.calcFrameStateVars(sa)
  const denyClone = root.opts.denyClone !== false
  const chains = []
  const inits = new Set()
  if (!root.opts.scopePrefix)
    throw new Error("`par` requires `scopePrefix:true`")
  if (s.opts.cleanupFrameVars)
    throw new Error("NOT IMPLEMENTED: `par` with `cleanupFrameVars:true`")
  Ctrl.convolveFrames(sa)
  const frames = root.cfg
  const [initJump] = root.first.exits
  const fchains = frameThreads(initJump.goto,root.resFrame)
        .filter(i => i && i.length > 1)
  const jchains = fchains.map(unfoldLinks)
  root.parDefs = []
  root.parFrames = []
  for(const nodes of jchains) {
    nodes.forEach(nodeVars)
    const edges = edgesByVars(nodes)
    const graph = buildGraph(nodes, edges)
    if (deriveBlocks(graph, s, root))
      root.hasPar = true
  }
  if (!root.parDefs || !root.parDefs.length)
    return s
  const res = Kit.toArray(substFrames(s))
  Ctrl.convolveFrames(res)
  return res
}

export const interpret = Kit.pipe(
  emitForkApp,
  Kit.toArray,
  copyVars)

/** 
 * collects all thread local vars into a separate storage 
 * also assigns `cloneCtx` property for operations requiring 
 * context's clone
 */
export function copyVars(si) {
  const s = Kit.auto(si)
  const root = s.first.value
  if (!root.hasPar)
    return s
  const {opts} = root
  if (!opts.defunct)
    throw new Error(
      "Not implemented: `parThreadState:\"closure\"` without `defunct:true`")
  const asClosure = opts.parThreadState === "closure"
  const asContext = opts.parThreadState === "context"
  if (!asClosure && !asContext)
    throw new Error(
      "Invalid value for \"parThreadState\": \"${opts.parThreadState}\"")
  if (asClosure && !root.handlerSym)
    throw new Error(
      `"parThreadState": "closure" requires "storeHandler", e.g. "storeHandler":"$run"`)
  const vars = new Set()
    /** detecting conflicting variables writes */
  const threadVars = root.threadVars = []
  for(const threads of root.parDefs) {
    for(const i of threads) {
      /** transitive closure thread's dependency */
      const clos = i.closLeft = new Set()
      for(const j of i.left) {
        clos.add(j)
        j.closLeft.forEach(clos.add,clos)
      }
      const parThreads = i.parThreads = new Set(threads)
      parThreads.delete(i)
      for(const j of clos) {
        j.parThreads.delete(i)
        parThreads.delete(j)
      }
      const w = i.w = new Set()
      const r = i.r = new Set()
      for(const j of i.steps) {
        if (j.skip) {
          for(const k of j.value)
            _calcFrameVars(k,w,r)
        } else {
          _calcFrameVars(j.frame,w,r)
        }
      }
    }
    const tlv = root.parThreadLocalVars = new Set()
    for(const i of threads) {
      const cv = i.conflicts = new Set()
      for(const j of i.parThreads) {
        for(const k of j.r) {
          if (i.w.has(k))
            tlv.add(k)
        }
      }
    }
  }
  let closureHandler
  if (asClosure) {
    root.closureHandler = Kit.scope.newSym()
    root.implFrame.value.declSym.substToks
      = [...s.toks(Tag.push,`$I()`,root.closureHandler)]
  }
  for(const i of vars) {
    if (i.local) {
      i.interpr = threadLocal
      threadVars.push(i)
    } else {
      const copy = Kit.scope.newSym(asClosure ? `${i.name}l` : i.name)
      i.parCopy = copy
      copy.interpr = threadLocal
      threadVars.push(copy)
    }
  }
  _cleanVars(root)
  let updTempCopyVar
  return _substAssignCopy(s)
  function _copy(from,to) {
    for(const i of from) {
      if (i.local && !i.extBind)
        continue
      to.add(i)
    }
  }
  function _calcFrameVars(frame,w,r) {
    if (frame.removed)
      return
    const sw = frame.stateVars
    if (!sw.extw) {
      _copy(sw.r,sw.er = new Set())
      _copy(sw.w,sw.ew = new Set())
    }
    sw.er.forEach(r.add,r)
    sw.ew.forEach(w.add,w)
  }
  function* _substAssignCopy(sw) {
    for(const i of sw) {
      if (i.enter) {
        // this may be only a variable from the code
        // and it may be changed only with assign or update
        switch(i.type) {
        case Block.frame:
          _cleanVars(i.value)
          break
        case Block.letStmt:
        case Ctrl.jump:
          const {tmpVar} = i.value
          if (tmpVar) {
            if (tmpVar.parThread)
              i.value.cloneCtx = true
            if (tmpVar.shared) {
              yield s.enter(Tag.push, Block.app,{reflected:true,sym:shareId,tmpVar})
              i.value.tmpVar = null
              yield* s.copy(i)
              yield* s.leave()
              continue
            }
          }
          break
        case Tag.Identifier:
          const {sym} = i.value
          if (sym.parCopy) {
            assert.ok(!i.value.lhs)
            yield s.tok(i.pos,Tag.Identifier,{sym:sym.parCopy})
            s.close(i)
            continue
          }
          break
        case Tag.AssignmentExpression:
          const lhs = s.cur()
          const op = i.value.node.operator
          if (lhs.type !== Tag.Identifier) {
            const buf = []
            const copies = []
            for(const j of s.one()) {
              buf.push(j)
              if (j.enter && j.type === Tag.Identifier) {
                const {sym} = j.value
                if (sym.parCopy)
                  copies.push(sym)
              }
            }
            if (!copies.length) {
              yield i
              yield* buf
              continue
            }
            const lab = s.label()
            yield s.enter(i.pos, Tag.SequenceExpression)
            yield s.enter(Tag.expressions, Tag.Array)
            yield s.enter(Tag.push, i.type, i.value)
            yield* buf
            yield* _substAssignCopy(s.one())
            yield* s.leave()
            s.close(i)
            for(const j of copies)
              yield* s.toks(Tag.push,`=$I=$I`,j.parCopy,j)
            yield* lab()
            continue
          }
          const lhsSym = lhs.value.sym
          if (lhsSym.parCopy) {
            // TODO: may be wrong may be 
            yield s.enter(i.pos,Tag.AssignmentExpression,{node:{operator:"="}})
            yield s.tok(Tag.left,Tag.Identifier,{sym:lhsSym.parCopy})
            yield s.enter(Tag.right, i.type, i.value)
            yield* s.one()
            yield* _substAssignCopy(s.sub())
            s.close(i)
            yield* s.leave()
            yield* s.leave()
            continue
          }
          break
        case Tag.UpdateExpression:
          const arg = s.cur()
          if (arg.type !== Tag.Identifier)
            break
          const argSym = arg.value.sym
          if (!argSym || !argSym.parCopy)
            break
          Kit.skip(s.sub())
          s.close(i)
          const uop = i.value.node.operator
          if (i.value.node.prefix) {
            yield* s.toks(i.pos,`=$I=${uop}$I`,argSym, argSym.parCopy)
          } else {
            if (!updTempCopyVar) {
              updTempCopyVar = Kit.scope.newSym("tmp")
              root.implFrame.value.savedDecls.set(updTempCopyVar,{raw:null})
            }
            yield* s.toks(i.pos,`=($1 = $2, $3 = ${uop}$2, $1)`,
                          updTempCopyVar, argSym, argSym.parCopy)
          }
          continue
        }
      }
      yield i
    }
    if (asContext)
      State.allUniqFields(threadVars)
  }  
  function _cleanVars(value) {
    const decls = value.savedDecls
    if (!decls)
      return
    for(const [n,v] of decls) {
      if (n.interpr === threadLocal) {
        assert.ok(!v.init)
        assert.ok(!v.raw)
        decls.delete(n)
      }
    }
  }
}

/** inject a wrapper function to hold thread local vars */
export function injectThread(si) {
  const s = Kit.auto(si)
  const root = s.first.value
  if (!root.hasPar)
    return s
  const {opts} = root
  if (opts.parThreadState !== "closure")
    return s
  const {threadVars,implFrame:{value:implFrame}} = root
  const implSym = implFrame.declSym
  return _injectThread()
  function *_injectThread() {
    for(const i of s) {
      if (i.enter && i.type === Tag.FunctionDeclaration
          && i.value === implFrame) {
        const lab = s.label()
        yield s.enter(i.pos,Tag.FunctionDeclaration,{moveToTop:i.value.moveToTop})
        yield s.tok(Tag.id,Tag.Identifier,{sym:root.closureHandler})
        yield s.enter(Tag.params,Tag.Array)
        for(const sym of  threadVars)
          yield s.tok(Tag.push,Tag.Identifier,{sym})
        yield* s.leave()
        yield s.enter(Tag.body,Tag.BlockStatement)
        yield s.enter(Tag.body,Tag.Array)
        yield s.enter(Tag.push,Tag.ReturnStatement)
        i.value.moveToTop = false
        yield s.enter(Tag.argument,Tag.FunctionExpression,i.value)
        yield* s.sub()
        yield* lab()
        s.close(i)
        continue
      }
      yield i
    }
  }
}

/** inserts context's clones and thread vals references */
export function cloneContext(si) {
  const s = Kit.auto(si)
  const root = s.first.value
  if (!root.hasPar)
    return s
  const {opts,contextSym} = root
  const closure = opts.parThreadState === "closure"
  const handler = closure && root.closureHandler
  const storageField = !closure && opts.threadStorageField
  const threadVars = root.threadVars
  return _cloneContext()
  function* _cloneContext() {
    for(const i of s) {
      if (i.enter && i.type === Tag.Identifier) {
        const {sym} = i.value
        if (sym === contextSym && i.value.origOp && i.value.origOp.cloneCtx) {
          const lab = s.label()
          if (closure) {
            yield* s.template(i.pos,`=$I.clone($I($E))`,contextSym,handler)
            for(const sym of threadVars)
              yield s.tok(Tag.push,Tag.Identifier,{sym})
          } else {
            yield* s.template(i.pos, `=$I.clone($E)`,contextSym)
            yield s.enter(Tag.push,Tag.ObjectExpression)
            yield s.enter(Tag.properties,Tag.Array)
            for(const sym of threadVars) {
              yield s.enter(Tag.push,Tag.ObjectProperty)
              yield s.tok(Tag.key,Tag.Identifier,{node:{name:sym.fieldName}})
              yield* field(Tag.value,sym)
              yield* s.leave()
            }
          }
          yield* lab()
          s.close(i)
          continue
        }
        if (storageField && sym && sym.interpr === threadLocal) {
          yield* field(i.pos,sym)
          s.close(i)
          continue
        }
      }
      yield i
    }
  }
  function* field(pos, sym) {
    assert.ok(sym.fieldName)
    yield s.enter(pos,Tag.MemberExpression)
    yield s.enter(Tag.object,Tag.MemberExpression)
    yield s.tok(Tag.object,Tag.Identifier,{sym:contextSym})
    yield s.tok(Tag.property,Tag.Identifier,{node:{name:storageField}})
    yield* s.leave()
    yield s.tok(Tag.property,Tag.Identifier,{node:{name:sym.fieldName}})
    yield* s.leave()
  }
}
