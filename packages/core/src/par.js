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
  if (node.block) {
    for(const i of node.value) {
      i._nodeVarsVisited = false
      i._nodeVars = node
      const {frame} = i
      const sw = frame.stateVars
      i.r = new Set(sw.r)
      i.w = new Set(sw.w)
      if (frame.patSym) {
        i.w.delete(frame.patSym)
        if (frame.patSym.bound)
          i.r.add(frame.patSym)
      }
    }
    const first = node.value[0]
    const jobs = [first]
    first.inited = new Set(first.w)
    while(jobs.length) {
      const job = jobs.pop()
      job._nodeVarsVisited = true
      up: for(const i of job.nonRecExits) {
        if (i._nodeVars !== node)
          continue
        for(const j of i.nonRecEnters)
          if (!j._nodeVarsVisited)
            continue up
        jobs.push(i)
      }
      if (job !== first) {
        const enters = Kit.share(job.nonRecEnters)
        const first = enters.take()
        const assigned = new Set(first.inited)
        for(const i of enters) {
          assert.ok(i._nodeVarsVisited)
          const pinited = i.inited
          for(const j of assigned) {
            if (!pinited.has(j))
              assigned.delete(j)
          }
        }
        const inited = job.inited = new Set(job.w)
        assigned.forEach(inited.add,inited)
        for(const i of assigned)
          job.r.delete(i)
      }
    }
    for(const {r,w} of node.value) {
      r.forEach(fv.add,fv)
      w.forEach(bv.add,bv)
    }
  } else {
    for(const i of node.value.content) {
      if (i.enter) {
        switch(i.type) {
        case Ctrl.jump:
        case Block.letStmt:
          if (i.value.sym)
            bv.add(i.value.sym)
          if (i.value.frameArgs) {
            for(const [b,f] of i.value.frameArgs) {
              bv.add(b)
              if (f !== Block.argSym)
                fv.add(f)
            }
          }
          break
        case Tag.Identifier:
          const sym = i.value.sym
          if (!i.value.sym || !sym.track)
            break
          if (i.value.opts.parAllLocals) {
            fv.add(sym)
            bv.add(sym)
          } else {
            if (i.value.rhs/* && !bv.has(sym)*/)
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
 *      // transitive closure of deps in left
 *      closLeft: Set<Thread>,
 *      // threads which may run in parallel with this one
 *      parThreads: Set<Thread>,
 *      // vars written/read by this thread
 *      w, r: Set<Symbol>
 *    }
 * 
 *    type Step = {
 *      block: false
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
 *      block: true,
 *      // prefix
 *      toks: false,
 *      value: FrameVal[],
 *      dirEnds: Set<LetVal>,
 *      indirEnds: Set<LetVal>,
 *      rec: boolean
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
 *     parDefs: {threads:Thread[][],graph:Graph,exit:LetStmt}
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
  /** ## Calculating initial threads graph from dependencies graph */
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
      cur = {scope,left:value,right:[src],remove:false}
    } else {
      cur = {scope:new Set([src]),left:[],right:[src],remove:false}
    }
    cur.id = src.id = id++
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
      if (j.block || j.value.fbound) {
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
  /** ### threads with just a single jump are useless, removing them */
  const removedOps = []
  for(const i of threads) {
    if (i.right.length !== 1)
      continue
    const [node] = i.right
    if (node.block)
      continue
    const op = node.value
    if (op.origType !== Ctrl.jump)
      continue
    if (op.frameArgs && op.frameArgs.size)
      continue
    removedOps.push(op)
    i.remove = true
  }
  threads = threads.filter(i => !i.remove)
  /** ## nothing to run in parallel here (giving up) */
  if (threads.length === 1)
    return false
  /** ## cleaning removed single jumps */
  for(const i of removedOps)
    i.ref.removed = true
  // /** ## sorting by source codes order */
  //   threads.sort((a, b) => a.right[0].id - b.right[0].id)
  /** ## Splitting threads back into frames (steps) */
  for(const i of threads) {
    let toks = []
    let lastExit
    const steps = i.steps = []
    for(const j of i.right) {
      if (j.block) {
        const frame = j.value[0].frame
        if (toks.length) {
          const declSym = Kit.scope.newSym("_")
          const ref = s.tok(Tag.push, Block.frame,
                            {declSym,savedDecls:new Map(),
                             resFrameRedir,catchContRedir:errFrameRedir,
                             dirEnters:new Set(),indirEnters:null}).value
          const exit = s.tok(Tag.push,Ctrl.jump,
                             {goto:frame,ref,gotoDests:[frame],
                              insideCtx:true,last:true})
          steps.push({toks,block:false,frame:ref,exit:exit.value})
          toks.push({content:[exit]})
          toks = []
        }
        lastExit = null
        steps.push({block:true,value:j.value,rec:j.rec,
                    frame,toks:false,ret:j.ret})
        continue
      }
      toks.push(j.value)
      /** ### frame bounds - injecting new frame */
      if (j.value.fbound) {
        lastExit = j.value
        const declSym = Kit.scope.newSym("_")
        const frame = s.tok(Tag.push, Block.frame,
                            {declSym,savedDecls:new Map(),
                             resFrameRedir,catchContRedir:errFrameRedir,
                             dirEnters:new Set(),indirEnters:null}).value
        steps.push({block:false,value:null,toks,exit:j.value,frame})
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
                           resFrameRedir,catchContRedir:errFrameRedir,
                           dirEnters:new Set(),indirEnters:null}).value
      const join = s.tok(Tag.push,Ctrl.jump,
                         {goto:pureExitFrame,
                          gotoDests:[pureExitFrame],
                          ref:frame,insideCtx:true,last:true})
      toks.push({content:[join]})
      last.exit = join.value
      last.frame = frame
      if (lastExit) {
        setDirGoto(lastExit, frame)
      }
      if (errFrameRedir)
        errFrameRedir.required = true
      if (resFrameRedir)
        resFrameRedir.required = true
    } else {
      last.toks = false
      last.exit = false
      last.frame = pureExitFrame
    }
  }
  /** ## saving last step exit to assign it into the last join jump */
  const exitNode = graph[graph.length-1][0]
  let exitGoto, exitIndirGoto
  if (exitNode.block) {
    if (exitNode.rec) {
      exitGoto = pureExitFrame
    } else  {
      const indirConts = exitNode.ret.conts || emptySet
      for(const i of exitNode.ret.jumps) {
        const {jump,dynFrame} = i
        const {indirJumps,frameArgs} = jump
        if (!i.dir && indirJumps) {
          for(const [cont,dyn] of indirJumps) {
            if (dyn === dynFrame) {
              // indirJumps.delete(cont)
              frameArgs.set(dyn.declSym, pureExitFrame.declSym)
              indirJumps.set(pureExitFrame, dyn)
              exitGoto = cont
              break
            }
          }
        }
        if (i.dir) {
          exitGoto = jump.goto
          exitIndirGoto = jump.indirGoto
          jump.indirGoto = jump.indirJumps = null
        } else if (i.indir) {
          exitGoto = jump.indirGoto
        } else {
          exitIndirGoto = i.jump.indirGoto
        }
      }
    }
  } else {
    const jump = exitNode.value
    // assert.ok(!exitGoto || exitGoto === jump.goto)
    exitGoto = jump.goto
    exitIndirGoto = jump.indirGoto
    jump.indirGoto = jump.indirJumps = null
  }
  /**
   * ## Generating frame's boundaries and calculating parameters
   * it require (patSym, declSym etc)
   */
  for(const i of threads) {
    const steps = i.steps
    for(const j of steps) {
      const f = j.frame
      if (j.toks) {
        for(const k of j.toks) {
          if (!k.block && k.ref)
            k.ref.removed = true
        }
      }
    }
    for(let j = 0, len = steps.length - 1; j < len; ++j) {
      const cur = steps[j]
      if (cur.rec)
        continue
      const next = steps[j+1]
      if (cur.block) {
        if (cur.ret && cur.ret.jumps) {
          const goto = next.frame
          for(const k of cur.ret.jumps) {
            if (k.dir)
              setDirGoto(k.jump,goto)
            else if (k.indir)
              setIndirGoto(k.jump,goto)
          }
        }
      } else
        setGoto(cur.exit,next.frame)
    }
  }
  const firstFrame = first.block ? first.value[0].frame : first.value.ref
  let topTryFrame
  let ccLen
  for(const [i] of graph) {
    const frame = i.block ? i.value[0].frame : i.value.ref
    const stack = frame.catchCont && frame.catchCont.stack
    if (stack == null)
      continue
    if (stack.length === 0) {
      topTryFrame = root.cfg[0]
      break
    }
    if (ccLen == null || ccLen > stack.length) {
      ccLen = stack.length
      topTryFrame = frame
    }
  }
  const head = s.tok(Tag.push, Block.frame,
                     {declSym:Kit.scope.newSym("_"),savedDecls:new Map(),
                      resFrameRedir:firstFrame.resFrameRedir,
                      catchContRedir:topTryFrame.catchContRedir,
                      catchCont:topTryFrame.catchCont,
                      resultContRedir:topTryFrame.resultContRedir,
                      resultCont:topTryFrame.resultCont,
                      dirEnters:new Set(),indirEnters:null
                     }).value
  firstFrame.parReplace = head
  for(const i of firstFrame.dirEnters) {
    if (i.goto === firstFrame)
      setDirGoto(i,head)
  }
  if (firstFrame.indirEnters) {
    for(const i of firstFrame.indirEnters) {
      if (i.indirGoto === firstFrame)
        setIndirGoto(i,head)
    }
  }
  /** ## generating expressions */
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
  const defs = {threads,graph}
  root.parFrames.push([...emitFrames()])
  root.parDefs.push(defs)
  return true

  /** gets all possible graph splittings calculating `dests` */
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
    const res = s.enter(Tag.push,Block.letStmt,{
      eff:true,reflected:tmpVar != null,goto:joinFrame,ref:head,tmpVar})
    if (joinFrame.dirEnters)
      joinFrame.dirEnters.add(res.value)
    yield res
    if (tup.length > 1) {
      yield s.tok(Tag.push,Block.app,{result:false,sym:forkId,tup,parDefs:defs})
    } else {
      const [sub] = tup
      assert.ok(sub.tmpVar)
      yield s.tok(Tag.push,Tag.Identifier,{sym:sub.tmpVar})
    }
    return res.value
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
        const {enter} = expr
        const jump = s.tok(Tag.push,Ctrl.jump,{
          ref:head,goto:enter,reflected:true,tmpVar})
        yield jump
        if (enter.dirEnters)
          enter.dirEnters.add(jump.value)
      }
      yield* lab()
    }
    const lastJoin = defs.exit = yield* emitFork(tup,pureExitFrame)
    if (exitGoto) {
      lastJoin.goto = exitGoto
      lastJoin.indirGoto = exitIndirGoto
      if (exitIndirGoto) {
        if (exitIndirGoto.dirEnters)
          (exitIndirGoto.indirEnters
           || (exitIndirGoto.indirEnters = new Set())).add(lastJoin)
      }
      if (exitGoto.dirEnters)
        exitGoto.dirEnters.add(lastJoin)
    }
    yield* lab()
    yield* s.leave()
    for(const i of threads) {
      const cw = i.conflicts
      for(const j of i.steps) {
        if (!j.block && j.toks && !j.removed) {
          yield s.enter(Tag.push, Block.frame, j.frame)
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
  root.hasEmptyThreads = false
  if (!root.hasPar)
    return s
  const {resFrameRedir,pureExitFrame} = root
  return _emitFork()
  function* _emitFork() {
    for(const i of s) {
      if (i.enter) {
        switch(i.type) {
        case Block.letStmt:
        case Ctrl.jump:
          if (i.value.tmpVar)
            i.value.tmpVar.emptyThread = false
          break
        case Block.effExpr:
          const {tmpVar} = i.value
          if (!tmpVar)
            break
          const la = s.cur()
          if (la.type !== Block.app)
            break
          if (la.value.sym === Block.pureId) {
            if (tmpVar.emptyThread !== false)
              tmpVar.emptyThread = true
          } else
            tmpVar.emptyThread = false
          break
        case Block.app:
          if (i.value.sym === forkId) {
            const vars = []
            for(const {tmpVar:j} of i.value.tup) {
              assert.ok(j)
              if (j.emptyThread)
                root.hasEmptyThreads = true
              else
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
                sym.parThread = i.value.parDefs
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
  function notPure(i) {
    return i.sym !== Block.pureId
  }
}

/** 
 * This calculates CFG suitable for deriving parallel operation chains
 *   type ICFGNode = {
 *     frame: FrameVal | null, // null is for `try` blocks
 *     exits,nonRecExits,enters,
 *     nonRecEnters,recEnters,tryExits: Set<CfgNode>,
 *     // depth-first traversal enter order
 *     beg: number,
 *     // depth-first traversal exit order
 *     end: number,
 *     parent: ICFGNode
 *   }
 */
export function calcCfg(frames) {
  const root = frames[0].root
  const {errFrameRedir,resFrameRedir} = root
  const nodes = []
  const jobs = []
  for(const i of frames) {
    i.parCfgNode = null
    i.parCfgTryNode = null
  }
  _node(frames[0])
  let clock = 0
  while(jobs.length) {
    const job = jobs.pop()
    const {node} = job
    if (!job.start) {
      job.node.end = clock++
      continue
    }
    const {frame} = node
    const fcc = frame.catchCont
    node.beg = clock++
    jobs.push({start:false,node})
    for(let i of frame.exits) {
      const goto = i.indirGoto || i.goto
      const {catchCont:jcc} = goto
      if (!goto || goto.dynamicJump)
        continue
      let enode = _node(goto)
      enode._scheduled = true
      /** detecting it is a start of `try-catch` statement */
      if (fcc && jcc && jcc !== fcc && !fcc.handler) {
        const js = jcc.stack
        const fs = fcc.stack
        const dest = []
        for(let i = 0, len = js.length; i < len; ++i) {
          const hgoto = js[i]
          if (fs[i] !== hgoto)
            dest.unshift(hgoto)
        }
        for(const hgoto of dest) {
          const start = _tryNode(goto,hgoto)
          _nonRecCon(start,enode)
          _nonRecCon(start,_node(hgoto))
          enode = start          
        }
      }
      if (enode.beg !== -1 && enode.end === -1)
        _recCon(node, enode)
      else
        _nonRecCon(node, enode)
    }
  }
  /** 
   * `try` handlers may not have normal exit, 
   * adding artificial one to avoid joining with next frames
   */
  for(const i of frames) {
    if (i.frameAfterTry && i.frameAfterTry.goto) {
      const s = i.frameAfterTry.close.parCfgNode
      const d = i.frameAfterTry.goto.parCfgNode
      if (s && d)
        _nonRecCon(s,d)
    }
  }
  return nodes
  function _nonRecCon(from, to) {
    from.exits.add(to)
    from.nonRecExits.add(to)
    to.enters.add(from)
    to.nonRecEnters.add(from)
  }
  function _recCon(from, to) {
    from.exits.add(to)
    to.enters.add(from)
    to.recEnters.add(from)
  }
  function _makeNode(frame,tryBlock) {
    const node = {frame,_scheduled:false,tryBlock,
                  beg:-1,end:-1,
                  exits:new Set(),enters:new Set(),
                  recEnters:new Set(),
                  nonRecExits:new Set(),nonRecEnters:new Set(),
                  tryExits:new Set()}
    nodes.push(node)
    return node
  }
  function _schedNode(frame) {
    const node = _makeNode(frame,false)
    jobs.push({start:true,node})
    return node
  }
  function _tryDests(js, fs, dest) {
    for(let i = 0, len = js.length; i < len; ++i) {
      const hgoto = js[i]
      if (fs[i] !== hgoto)
        dest.push(hgoto)
    }
  }
  function _node(frame) {
    return frame.parCfgNode || (frame.parCfgNode = _schedNode(frame))
  }
  function _tryNode(frame, handle) {
    return handle.parCfgTryNode || (handle.parCfgTryNode = _makeNode(frame,true))
  }
}


/** 
 * calculates frame's chains which can be parallelized
 * 
 *    type FrameNode = { block:false, value:ICFGNode }
 *      // sequence of frames which cannot be added to the chain
 *      // because of more than one exit or enter, or `parRegion:false`  
 *      | {block:true, value:ICFGNode[], rec: boolean}
 *
 * each FrameNode in the chain has exactly one enter from the previous link
 * and exactly one exit to the next link
 */
export function frameThreads(root,icfg) {
  const icfchains = []
  const iter = 0
  const len = icfg.length
  const {pureExitFrame} = root
  for(const i of icfg) {
    i.available = false
    i.handled = false
  }
  if (icfg.length < 2)
    return icfchains
  const first = icfg[0]
  _flow(first,new Set(),new Set())
  /** removing first `scope` op */
  return icfchains.filter(notSingle)
  function _flow(node,block,schedule) {
    const chain = []
    const chainNum = icfchains.push(chain)
    trav: for(;;) {
      if (!node) {
        schedule.add(pureExitFrame)
        break
      }
      if (!node.exits.size) {
        schedule.add(node)
        break
      }
      if (node.nonRecEnters.size > 1) {
        if (!node.available) {
          schedule.add(node)
          break
        }
      }
      if (node.handled) {
        schedule.add(node)
        break
      }
      node.handled = true
      if (node.exits.size > 1
          /** infinite may have only 1 exit */
          || node.recEnters.size) {
        const forks = []
        const subBlock = new Set()
        if (!node.tryBlock)
          subBlock.add(node)
        const residual = new Set()
        let blockNode = {block:true}
        let hasJoins = true
        for(const tasks = new Set(node.exits);tasks.size;) {
          /** works only if exits to loops' bodies are first in `exits` set */
          const [i] = tasks
          tasks.delete(i)
          if (!i.exits.size) {
            hasJoins = false
            continue
          }
          const threadBlock = new Set()
          let subChain = _flow(i,threadBlock,residual)
          const rec = residual.has(node)
          threadBlock.forEach(subBlock.add,subBlock)
          if (rec) {
            residual.delete(node)
            if (subChain)
              subChain.push({block:true,value:[node,...threadBlock],rec:true})
          }
          up: for(const i of residual) {
            if (i.handled)
              continue
            for(const j of i.enters) {
              if (!subBlock.has(j))
                continue up
            }
            residual.delete(i)
            i.available = true
            if (!tasks.has(i))
              tasks.add(i)
          }
          if (hasJoins && !residual.size && tasks.size < 2) {
            [node] = tasks
            blockNode.value = [...subBlock]
            subBlock.forEach(block.add,block)
            chain.push(blockNode)
            continue trav
          }
        }
        if (residual.size === 1) {
          blockNode.value = [...subBlock]
          subBlock.forEach(block.add,block)
          chain.push(blockNode)
        }
        residual.forEach(schedule.add,schedule)
        subBlock.forEach(block.add,block)
        if (!hasJoins) {
          schedule.add(pureExitFrame)
          return null
        }
        break
      }
      if (!node.tryBlock) {
        if (!node.frame.noInline)
          chain.push({block:false,value:node,rec:false})
        block.add(node)
      }
      const prev = node;
      [node] = node.exits
    }
    return chain
  }
}

/** folds operations with disabled par region into a block */
function skipDisabled(fchain) {
  const res = []
  let curBlock
  for(const i of fchain) {
    if (i.block) {
      if (curBlock) {
        curBlock.value.push(...i.value)
      } else {
        res.push(curBlock = {block:true,value:[...i.value]})
      }
    } else {
      if (!i.value.enabled || i.value.vars && i.value.vars.size) {
        if (curBlock) {
          curBlock.value.push(i.value)
        } else {
          res.push(curBlock = {block:true,value:[i.value]})
        }
      } else {
        curBlock = null
        res.push(i)
      }
    }
  }
  return res.filter(i => !i.block || i.value.length)
}

/** 
 * Splits frames threads on region boundaries
 *
 * takes FrameNode[]
 * returns NestedFrameNode[]
 * type NestedFrameNode = FrameNode[] | {block:null,value:NestedFrameNode} 
 */
function splitByRegion(fchain) {
  for(const i of fchain)
    i.first = i.block ? i.value[0] : i.value
  let [cur,...rest] = fchain
  let path = cur.first.region
  const chains = new Array(path.length+1)
  const chain = chains[path.length-1] = [cur]
  const res = []
  for(const i of rest) {
    const next = i.first.region
    let pos = 0
    const plen = path.length
    const nlen = next.length
    const len = Math.min(plen,nlen)
    for(; pos < len; ++pos) {
      if (path[pos] !== next[pos])
        break
    }
    const skip = []
    if (pos > 0) {
      _flatten(pos, skip)
      if (skip.length)
        _chainAt(pos-1).push({block:true,value:skip})
    }
    path = next
    _chainAt(nlen-1).push(i)
  }
  _flatten(0, [])
  return res
  function _flatten(pos, skip) {
    for(let j = chains.length - 1; j >= pos; --j) {
      const chain = chains[j]
      if (chain) {
        if (skip.length && path[j].enabled)
          chain.push({block:true,value:[...skip]})
        for(const k of Kit.reverse(chain)) {
          if (k.block)
            skip.unshift(...k.value)
          else
            skip.unshift(k.value)
        }
        chains[j] = null
        if (chain.length > 1 && path[j].enabled)
          res.unshift(chain)
      }
    }
  }
  function _chainAt(pos) {
    let chain = chains[pos]
    if (!chain)
      chain = chains[pos] = []
    return chain
  }
}

/**
 * Returns chain with Frame links unfolded to their operations
 *
 *  chain: FrameNode[]
 *  type Node = {block:false,value:Val} 
 *    | {block:true,value:ICFGNode[], ret: ExitInfo}
 *  type JumpCtx = {jump:JumpVal,dir:boolean,indir:boolean,dynFrame?:DynFrame}
 *  type ExitInfo = {
 *    // jump ops exiting the block in `goto`
 *    jumps:JumpCtx[],
 *    // common indirJumps outside of the block
 *    conts: Set<DynFameVal>
 *    }
 *  returns Node[]
 */
function unfoldLinks(chain) {
  const res = []
  for(const i of chain) {
    if (i.block) {
      res.push(i)
      const avail = new Set(i.value.map(i => i.frame))
      let dest
      const indirDest = new Map()
      const jumps = []
      const indir = new Map()
      const conts = new Set()
      let join
      for(const j of i.value) {
        for(const k of j.exits) {
          if (!avail.has(k.frame)) {
            assert.ok(join == null || join === k.frame)
            join = k.frame
          }
        }
      }
      for(const j of i.value) {
        for(const k of j.frame.exits) {
          const {goto} = k
          if (goto.dynamicJump)
            continue
          if (goto === join)
            jumps.push({jump:k,dir:true,indir:false})
          const {indirJumps,indirGoto} = k
          if (indirJumps && indirJumps.size) {
            for(const [cont,dyn] of indirJumps) {
              if (cont === join) {
                jumps.push({jump:k,dir:false,
                            indir:indirGoto === cont,dynFrame:dyn})
              } else if (!avail.has(cont)) {
                const dest = indirDest.get(dyn.declSym)
                conts.add(dyn)
                if (!dest) {
                  indirDest.set(dyn.declSym, cont)
                } else {
                  assert.ok(dest === cont)
                }
              }
            }
          }
        }
      }
      i.ret = {jumps,conts}
    } else {
      for(const j of i.value.frame.steps)
        res.push({block:false,value:j})
    }
  }
  return res
}

/** adds new generated frames into the output stream */
function* substFrames(si) {
  const s = Kit.auto(Block.cleanup(si))
  const root = s.first.value
  let c
  for(c of s) {
    if (c.leave && c.type === Block.chain)
      break
    yield c
  }
  for(const frame of root.parFrames) {
    yield* frame
  }
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
  if (!root.hasParRegions)
    return sa
  State.calcFrameStateVars(sa)
  const denyClone = root.opts.denyClone !== false
  const chains = []
  const inits = new Set()
  if (!root.opts.scopePrefix)
    throw new Error("`par` requires `scopePrefix:true`")
  if (s.opts.cleanupFrameVars)
    throw new Error("NOT IMPLEMENTED: `par` with `cleanupFrameVars:true`")
  if (!s.opts.keepLastPure)
    throw new Error("`par` requires `keepLastPure:true`")
  Ctrl.convolveFrames(sa)
  const frames = root.cfg
  const [initJump] = root.first.exits
  const icfg = calcCfg(frames)
  /** 
   * `dirEnters`/`indirEnters` are like `enters` 
   * but separate direct and indirect jumps 
   */
  for(const i of frames) {
    i.dirEnters = new Set()
    i.indirEnters = null
  }
  for(const i of frames) {
    for(const j of i.exits) {
      let {goto,indirGoto,indirJumps} = j
      if (indirJumps && indirJumps.size && !indirGoto)
        j.indirGoto = indirGoto = root.resFrame
      if (goto && !goto.dynamicJump)
        goto.dirEnters.add(j)
      if (indirGoto && !indirGoto.dynamicJump)
        (indirGoto.indirEnters || (indirGoto.indirEnters = new Set())).add(j)
    }
  }
  
  for(const i of icfg) {
    const {frame} = i
    const {chain} = frame
    i.region = chain && chain.parRegion
  }
  const fchains = frameThreads(root,icfg).filter(notSingle)
  const tchains = [].concat(...fchains.map(splitByRegion)).filter(notSingle)
  const jchains = tchains.map(unfoldLinks)
  root.parDefs = []
  root.parFrames = []
  for(const i of icfg)
    i._nodeVars = false
  for(const nodes of jchains)
    nodes.forEach(nodeVars)
  for(const nodes of jchains) {
    const edges = edgesByVars(nodes)
    const graph = buildGraph(nodes, edges)
    if (deriveBlocks(graph, s, root))
      root.hasPar = true
  }
  if (!root.parDefs || !root.parDefs.length)
    return s
  const res = Kit.toArray(substFrames(s))
  Ctrl.convolveFrames(res)
  for(const i of root.cfg) {
    if (i.resFrameRedir && i.resFrameRedir.parReplace)
      i.resFrameRedir = i.resFrameRedir.parReplace
    if (i.catchContRedir && i.catchContRedir.parReplace)
      i.catchContRedir = i.catchContRedir.parReplace
  }
  return res
}

/** 
 * Marks `parRegion` hierarchy adding `parRegion:number`, `parEnabled:boolean` 
 * field to each effectful `letStmt`.
 * Operations from different levels should not be added into same thread.
 * This doesn't mean they cannot run in parallel though. As they may be still
 * in same parent thread.
 */
export function markRegions(si) {
  const sa = Kit.toArray(si)
  const s = Kit.auto(sa)
  const root = s.first.value
  root.hasParRegions = false
  if (!root.opts.par)
    return sa
  let cnt = 0
  _markRegions(
    [root.rootParRegion = {id:++cnt,enabled:root.opts.parRegion}],s)
  return sa
  function _markRegions(stack,sw) {
    const enabled = stack[stack.length-1].enabled
    if (enabled)
      root.hasParRegions = true
    for(const i of sw) {
      if (i.enter && i.type === Block.chain) {
        const {optsAssign} = i.value
        i.value.parRegion = stack
        if (!optsAssign)
          continue
        const {parRegion} = optsAssign
        if (parRegion == null || parRegion === enabled)
          continue
        _markRegions(
          i.value.parRegion = [...stack,{id:++cnt,enabled:parRegion}],s.sub())
      }
    }
  }
}

/** removes threads marked as empty on `emitForkApp` */
function cleanEmptyThreads(si) {
  const s = Kit.auto(si)
  const root = s.first.value
  if (!root.hasEmptyThreads)
    return s
  return _cleanEmptyThreads()
  function* _cleanEmptyThreads() {
    for(const i of s) {
      if (i.enter && i.type === Block.effExpr
          && i.value.tmpVar && i.value.tmpVar.emptyThread) {
        Kit.skip(s.copy(i))
        continue
      }
      yield i
    }
  }
}

export const interpret = Kit.pipe(
  emitForkApp,
  Kit.toArray,
  cleanEmptyThreads,
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
  for(const defs of root.parDefs) {
    const {threads,exit} = defs
    const totW = defs.w = new Set()
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
      for(const j of i.right) {
        _copy(j.fv, r)
        _copy(j.bv, w)
      }
      w.forEach(totW.add,totW)
    }
    for(const i of threads) {
      for(const j of i.parThreads) {
        for(const k of j.r) {
          if (i.w.has(k))
            vars.add(k)
        }
      }
    }
  }
  for(const i of vars) {
    if (i.local) {
      i.interpr = threadLocal
      threadVars.push(i)
      i.origSym = i
    } else {
      const copy = Kit.scope.newSym(asClosure ? `${i.name}l` : i.name)
      i.parCopy = copy
      copy.origSym = i
      copy.interpr = threadLocal
      threadVars.push(copy)
    }
  }
  let closureHandler
  if (asClosure && threadVars.length) {
    closureHandler = root.closureHandler = Kit.scope.newSym()
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
    if (r)
      sw.er.forEach(r.add,r)
    if (w)
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
            i.value.cloneCtx = tmpVar.parThread
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
          if (sym && sym.parCopy) {
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
                if (sym.parCopy) {
                  copies.push(sym)
                  j.value.sym = sym.parCopy
                }
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
              yield* s.toks(Tag.push,`=$I=$I`,j,j.parCopy)
            yield* lab()
            continue
          }
          const lhsSym = lhs.value.sym
          if (lhsSym.parCopy) {
            yield s.enter(i.pos,Tag.AssignmentExpression,{node:{operator:"="}})
            yield s.tok(Tag.left,Tag.Identifier,{sym:lhsSym})
            yield s.enter(Tag.right, i.type, i.value)
            lhs.value.sym = lhsSym.parCopy
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
            yield* s.toks(i.pos,`=$I=${uop}$I`,argSym.parCopy,argSym)
          } else {
            if (!updTempCopyVar) {
              updTempCopyVar = Kit.scope.newSym("tmp")
              root.implFrame.value.savedDecls.set(updTempCopyVar,{raw:null})
            }
            yield* s.toks(i.pos,`=($1 = $2, $3 = ${uop}$2, $1)`,
                          updTempCopyVar, argSym.parCopy, argSym)
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
  if (!root.closureHandler)
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
        for(const sym of threadVars)
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
  const implFrame = root.implFrame.value.declSym
  return _cloneContext()
  function* _cloneContext() {
    for(const i of s) {
      if (i.enter && i.type === Tag.Identifier) {
        const {sym} = i.value
        if (sym === contextSym && i.value.origOp && i.value.origOp.cloneCtx) {
          const lab = s.label()
          const {w} = i.value.origOp.cloneCtx
          const vars = []
          for(const sym of threadVars)
            vars.push(w.has(sym.origSym)?sym.origSym:sym)
          if (closure) {
            if (handler) {
              yield* s.template(i.pos,`=$I.clone($I($E))`,contextSym,handler)
              for(const sym of vars) {
                yield s.tok(Tag.push,Tag.Identifier,{sym})
              }
            } else
              yield* s.toks(i.pos,`=$I.clone($I)`,contextSym,implFrame)
          } else {
            if (threadVars.length) {
              yield* s.template(i.pos, `=$I.clone($E)`,contextSym)
              yield s.enter(Tag.push,Tag.ObjectExpression)
              yield s.enter(Tag.properties,Tag.Array)
              for(const sym of vars) {
                yield s.enter(Tag.push,Tag.ObjectProperty)
                yield s.tok(Tag.key,Tag.Identifier,{node:{name:sym.fieldName}})
                yield* field(Tag.value,sym)
                yield* s.leave()
              }
            } else {
              yield* s.toks(i.pos, `=$I.clone()`,contextSym)
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

function setGoto(jump, newGoto) {
  if (jump.indirGoto)
    setIndirGoto(jump, newGoto)
  else
    setDirGoto(jump, newGoto)
}

function setDirGoto(jump, newGoto) {
  if (newGoto.dirEnters)
    newGoto.dirEnters.add(jump)
  if (jump.sym)
    newGoto.patSym = jump.sym
  jump.goto = newGoto
}

function setIndirGoto(jump, newGoto) {
  const oldGoto = jump.indirGoto
  if (oldGoto === newGoto)
    return
  if (newGoto.dirEnters)
    (newGoto.indirEnters || (newGoto.indirEnters = new Set())).add(jump)
  jump.indirGoto = newGoto
  const dyn = jump.indirJumps.get(oldGoto)
  if (dyn) {
    jump.indirJumps.set(newGoto,dyn)
    jump.frameArgs.set(dyn.declSym,newGoto.declSym)
  }
}

const emptySet = new Set()

function notSingle(chain) { return chain.length > 1 }
function notTryBlock(node) { return !node.tryBlock }
