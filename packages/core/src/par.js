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
export const forkJumpId = Kit.sysId("fork")
export const forkChainId = Kit.sysId("chainFork")
export const joinId = Kit.sysId("join")
export const clockSym = Kit.sysId("$clk",true)
export const tlsSym = Kit.sysId("$tls",true)

const setAdd = Set.prototype.add

/** 
 * returns edges for variables dependencies (read, written, set)
 *
 *  type Node = Node & {rv:Set<Sym>, wv:Set<Sym>, sv: Set<Sym>} 
 */
function nodeVars(node) {
  const rv = node.rv = new Set()
  const wv = node.wv = new Set()
  const sv = node.sv = new Set()
  if (node.block) {
    for(const i of node.value) {
      i._nodeVarsVisited = false
      i._nodeVars = node
      const {frame} = i
      const sw = frame.stateVars
      const r = i.r = new Set(sw.r)
      const w = i.w = new Set(sw.w)
      const s = i.s = new Set(sw.s)
      i.inited = new Set()
      /** changing the pattern symbols meaning */
      for(const j of frame.exits) {
        if (j.sym && j.sym.bound) {
          w.add(j.sym)
          s.add(j.sym)
        }
      }
      if (frame.patSym) {
        w.delete(frame.patSym)
        s.delete(frame.patSym)
        if (frame.patSym.bound)
          r.add(frame.patSym)
      }
      w.forEach(setAdd,wv)
    }
    for(const i of node.pseudo) {
      i._nodeVarsVisited = false
      i._nodeVars = node
    }
    const first = node.value[0]
    const jobs = [first]
    first.s.forEach(setAdd,first.inited)
    first.r.forEach(setAdd,rv)
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
      if (job.tryBlock)
        continue
      if (job !== first) {
        const inited = job.inited
        for(const i of job.s) {
          if (!rv.has(i))
            inited.add(i)
        }
        const enters = Kit.share(job.nonRecEnters)
        const head = enters.take()
        const assigned = new Set(head.inited)
        for(const {inited} of enters) {
          for(const i of assigned) {
            if (!inited.has(i))
              assigned.delete(i)
          }
        }
        assigned.forEach(setAdd,inited)
        /** not considering reads which are inited in the same block before */
        for(const i of job.r) {
          if (!inited.has(i))
            rv.add(i)
        }
      }
    }
    for(const {inited} of node.value) {
      for(const i of inited) {
        if (!rv.has(i)) {
          sv.add(i)
          wv.delete(i)
        }
      }
    }
  } else {
    let first = true
    for(const i of node.value.content) {
      if (i.enter) {
        switch(i.type) {
        case Ctrl.jump:
        case Block.letStmt: {
          const {sym} = i.value
          if (sym)
            _addW(sym,first)
          if (i.value.frameArgs) {
            for(const [b,f] of i.value.frameArgs) {
              _addW(b,first)
              if (f !== Block.argSym)
                rv.add(f)
            }
          }
          break
        }
        case Tag.Identifier:
          const sym = i.value.sym
          if (!i.value.sym || !sym.track)
            break
          if (i.value.opts.parAllLocals) {
            wv.add(sym)
            rv.add(sym)
          } else {
            if (i.value.rhs)
              rv.add(sym)
            if (i.value.lhs)
              _addW(sym,first)
          }
          break
        case Block.bindPat:
          rv.add(i.value.sym)
          break
        //TODO: better control flow analysis to remove some redundant deps
        case Tag.UnaryExpression:
        case Tag.BinaryExpression:
        case Tag.UpdateExpression:
        case Tag.AssignmentExpression:
        case Tag.SequenceExpression:
        case Tag.ExpressionStatement:
        case Tag.Array:
          break
        default:
          first = false
        }
      }
    }
    for(const i of sv) {
      rv.delete(i)
      wv.delete(i)
    }
  }
  function _addW(sym,first) {
    if (first && !rv.has(sym))
      sv.add(sym)
    else
      wv.add(sym)
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
  const writes = new Map()
  const res = []
  for(const dst of nodes) {
    for(const i of dst.rv) {
      const srcs = writes.get(i)
      if (srcs) {
        for(const src of srcs)
          res.push([src,dst])
      }
    }
    for(const i of dst.sv) {
      writes.set(i,[dst])
    }
    for(const i of dst.wv) {
      let srcs = writes.get(i)
      if (!srcs)
        writes.set(i,srcs = [])
      srcs.push(dst)
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
 *   type PareDefs = {threads:Thread[][],graph:Graph,exit:LetStmt}
 * 
 *   type RootVal = RootVal & { 
 *     parDefs: ParDefs
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
  // here the last block may be recursive - if the former has a mark
  /** first letStmt stays in same frame, other frames are rebuilt */
  const first = graph[0][0]
  const last = graph[graph.length-1][0]
  
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
      cur = {scope,left:value,right:[src],removed:false}
    } else {
      cur = {scope:new Set([src]),left:[],right:[src],removed:false}
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
  threads = threads.filter(notRemoved)
  /**
   * ### merging serialized threads (running sequentially anyway)
   */
  for(const i of threads) {
    if (i.left.length === 1) {
      const [l] = i.left
      if (l.rc === 1) {
        l.removed = true
        i.right.unshift(...l.right)
        i.left = l.left
      }
    }
  }
  threads = threads.filter(notRemoved)
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
    i.removed = true
  }
  threads = threads.filter(notRemoved)
  /** ## nothing to run in parallel here (giving up) */
  if (threads.length === 1)
    return false
  /** ## cleaning removed single jumps */
  for(const i of removedOps)
    i.ref.removed = true
  /** ## saving last step exit to assign it into the last join jump */
  let exitGoto, exitIndirGoto
  if (last.block) {
    const indirConts = last.ret.conts || emptySet
    for(const i of last.ret.jumps) {
      const {jump,dynFrame} = i
      const {indirJumps,frameArgs} = jump
      if (!i.dir && indirJumps) {
        for(const [cont,dyn] of indirJumps) {
          if (dyn === dynFrame) {
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
        jump.indirJumps = jump.indirGoto = null
      } else if (i.indir) {
        exitGoto = jump.indirGoto
      } else {
        exitIndirGoto = i.jump.indirGoto
      }
    }
  } else {
    const jump = last.value
    exitGoto = jump.goto
    exitIndirGoto = jump.indirGoto
    jump.indirJumps = jump.indirGoto = null
  }
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
        steps.push({block:true,value:j.value,loop:j.loop,
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
        lastExit.goto.patSym = null
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
  let loopHead
  /**
   * ## Separate loop's enter frame
   */
  if (last.loop) {
    const {loopEnter:{frame:loopFrame}} = last
    loopHead = s.tok(Tag.push, Block.frame,
                     {declSym:Kit.scope.newSym("_plh"),savedDecls:new Map(),
                      resFrameRedir:loopFrame.resFrameRedir,
                      catchContRedir:loopFrame.catchContRedir,
                      catchCont:loopFrame.catchCont,
                      resultContRedir:loopFrame.resultContRedir,
                      resultCont:loopFrame.resultCont,
                      dirEnters:new Set(),indirEnters:null
                     }).value
    const chainFrames = new Set()
    for(const [src] of graph) {
      if (src.block) {
        for(const i of src.value)
          chainFrames.add(i.frame)
      } else if (src.value.ref)
        chainFrames.add(src.value.ref)
    }
    for(const i of loopFrame.dirEnters) {
      if (i.goto === loopFrame && !chainFrames.has(i.ref))
        setDirGoto(i,loopHead)
    }
    if (loopFrame.indirEnters) {
      for(const i of loopFrame.indirEnters) {
        if (i.indirGoto === loopFrame && !chainFrames.has(i.ref))
          setIndirGoto(i,loopHead)
      }
    }
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
                     {declSym:Kit.scope.newSym("_ph"),savedDecls:new Map(),
                      resFrameRedir:firstFrame.resFrameRedir,
                      catchContRedir:topTryFrame.catchContRedir,
                      catchCont:topTryFrame.catchCont,
                      resultContRedir:topTryFrame.resultContRedir,
                      resultCont:topTryFrame.resultCont,
                      dirEnters:new Set(),indirEnters:null
                     }).value
  firstFrame.parReplace = head
  for(const i of firstFrame.dirEnters) {
    if (i.goto === firstFrame/* && !chainFrames.has(i.ref)*/)
      setDirGoto(i,head)
  }
  if (firstFrame.indirEnters) {
    for(const i of firstFrame.indirEnters) {
      if (i.indirGoto === firstFrame /*&& !chainFrames.has(i.ref)*/)
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
  const defs = {threads,graph,loop:last.loop && last}
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
  function* emitFork(tup,joinFrame,tmpVar,parThread) {
    assert.ok(joinFrame)
    const res = s.enter(Tag.push,Block.letStmt,{
      eff:true,reflected:tmpVar != null,
      goto:joinFrame,ref:head,tmpVar,parDefs:defs,parThread})
    if (tmpVar)
      tmpVar.thread = parThread
    if (joinFrame.dirEnters)
      joinFrame.dirEnters.add(res.value)
    yield res
    yield s.tok(Tag.push,Block.app,{result:false,sym:joinId,tup,parDefs:defs})
    return res.value
  }
  /** emits parallel frames */
  function* emitFrames() {
    let loopCont
    if (loopHead) {
      const lab = s.label()
      yield s.enter(Tag.push,Block.frame,loopHead)
      const tmpVar = Kit.scope.newSym()
      tmpVar.shared = false
      tmpVar.thread = false
      tmpVar.parLoop = defs
      loopHead.savedDecls.set(tmpVar,{})
      yield s.tok(Tag.push,Ctrl.jump,{
        ref:loopHead,goto:last.loopEnter.frame,reflected:true,tmpVar,
        bindName:forkJumpId.orig,opSym:forkJumpId})
      const cont = s.enter(Tag.push,Block.letStmt,
                           {eff:true,goto:pureExitFrame,ref:loopHead})
      yield cont
      defs.joinGoto = cont.value
      loopCont = cont.value
      yield s.tok(Tag.push,Tag.Identifier,{sym:tmpVar})
      yield* lab()
    }
    yield s.enter(Tag.push,Block.frame,head)
    const lab = s.label()
    for(const i of threads) {
      const {expr} = i
      let tmpVar = expr.tmpVar = Kit.scope.newSym()
      head.savedDecls.set(tmpVar,{})
      tmpVar.shared = expr.rc > 1
      tmpVar.thread = false
      if (expr.fork) {
        yield* emitFork(expr.tup,i.enter = expr.join.enter,tmpVar,i)
      } else {
        const {enter} = expr
        i.enter = enter
        const jump = s.tok(Tag.push,Ctrl.jump,{
          ref:head,goto:enter,reflected:true,tmpVar,parDefs:defs,parThread:i})
        tmpVar.thread = i
        yield jump
        if (enter.dirEnters)
          enter.dirEnters.add(jump.value)
      }
      tmpVar.parLoop = false
      yield* lab()
    }
    let chainCont = defs.exit = yield* emitFork(tup,pureExitFrame)
    if (loopCont)
      chainCont = loopCont
    else
      defs.joinGoto = chainCont
    if (chainCont && exitGoto) {
      chainCont.goto = exitGoto
      chainCont.indirGoto = exitIndirGoto
      if (exitIndirGoto) {
        if (exitIndirGoto.dirEnters)
          (exitIndirGoto.indirEnters
           || (exitIndirGoto.indirEnters = new Set())).add(chainCont)
      }
      if (exitGoto.dirEnters)
        exitGoto.dirEnters.add(chainCont)
      chainCont.parJoin = defs
    }
    yield* lab()
    yield* s.leave()
    for(const i of threads) {
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

function adjustForkOps(si) {
  const s = Kit.auto(si)
  const root = s.first.value
  if (!root.hasPar || s.opts.inlineSharedOp)
    return s
  const {parShare} = s.opts
  return _adjustForkOps()
  function* _adjustForkOps(){
    for(const i of s) {
      if (i.enter) {
        switch(i.type) {
        case Block.letStmt:
        case Ctrl.jump:
          if (!i.value.goto)
            break
          const {tmpVar} = i.value
          const lab = s.label()
          if (!tmpVar || tmpVar.emptyThread)
            break
          if (tmpVar.shared && parShare) {
            yield s.enter(Tag.push,Block.app,
                          {reflected:true,sym:shareId,tmpVar})
            i.value.tmpVar = null
          }
          yield s.peel(i)
          let tlsCopy
          if (tmpVar.thread && !tmpVar.thread.removed) {
            if (i.type === Block.letStmt) {
              i.value.bindName = forkChainId.orig
              i.value.opSym = forkChainId
            } else {
              i.value.bindName = forkJumpId.orig
              i.value.opSym = forkJumpId
            }
            tlsCopy = tmpVar.thread.fork.tlsCopy
          }
          if (tmpVar.parLoop)
            tlsCopy = tmpVar.parLoop.tlsCopy
          yield tlsCopy === null
            ? s.tok(Tag.push,Tag.NullLiteral)
            : s.tok(Tag.push,Tag.Identifier,{sym:tlsCopy})
          if (!i.leave)
            yield* s.sub()
          yield* lab()
          continue
        }
      }
      yield i
    }
  }
}

/** injects `join` and `fork` operators */
function emitForkApp(si) {
  const s = Kit.auto(si)
  const root = s.first.value
  root.hasEmptyThreads = false
  if (!root.hasPar)
    return s
  const {resFrameRedir,pureExitFrame,forkTmpVar} = root
  return _emitFork()
  function* _emitFork() {
    for(const i of s.sub()) {
      if (i.enter) {
        switch(i.type) {
        case Ctrl.jump:
          if (i.value.tmpVar) {
            i.value.tmpVar.emptyThread = i.value.goto === root.pureExitFrame
            yield* s.copy(i)
            continue
          }
          break
        case Block.letStmt:
          if (!i.value.goto)
            break
          if (i.value.eff) {
            if (s.cur().type !== Block.app)
              break
            /** optimizing `chain(pure(),X)` */
            const sub = Kit.toArray(_emitFork())
            const f = sub[0]
            if (f.type === Block.app && f.value.sym === Block.pureId) {
              if (i.value.goto === root.pureExitFrame) {
                if (i.value.tmpVar)
                  i.value.tmpVar.emptyThread = true
                yield s.enter(i.pos,Block.effExpr,i.value)
                yield* sub
              } else {
                yield s.enter(i.pos,Ctrl.jump,i.value)
                if (sub.length > 2)
                  yield* sub.slice(1,sub.length-1)
              }
              yield* s.leave()
              s.close(i)
            } else {
              yield i
              yield* sub
            }
            continue
          }
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
          if (i.value.sym === joinId) {
            const vars = []
            for(const {tmpVar:j} of i.value.tup) {
              assert.ok(j)
              if (j.emptyThread)
                root.hasEmptyThreads = true
              else
                vars.push(j)
            }
            if (vars.length === 0) {
              yield s.enter(i.pos,i.type,{sym:Block.pureId})
              if (!i.leave)
                yield* s.sub()
              yield* s.leave()
            } else if (vars.length === 1) {
              const [sym] = vars
              sym.parFork = i.value.parDefs
              yield s.tok(i.pos,Tag.Identifier,{sym})
            } else {
              const lab = s.label()
              yield s.enter(i.pos,i.type,i.value)
              yield s.enter(Tag.push,Tag.ArrayExpression)
              yield s.enter(Tag.elements,Tag.Array)
              for(const sym of vars) {
                yield s.tok(Tag.push,Tag.Identifier,{sym})
                sym.parFork = i.value.parDefs
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
      node.end = clock++
      let loops = node.loops
      for(const i of node.nonRecExits) {
        if (!i.loops)
          continue
        if (!loops)
          loops = node.loops = new Set()
        for(const j of i.loops)
          if (j !== node)
            loops.add(j)
      }
      if (node.tryWrap)
        jobs.push({start:false,node:node.tryWrap})
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
          const start = enode.tryWrap = _tryNode(goto,hgoto);
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
      if (s && d) {
        if (s.beg < d.beg)
          _nonRecCon(s,d)
        else 
          _recCon(s,d)
      }
    }
  }
  /** calculating next node after loops exits */
  for(const i of nodes) {
    const {loops} = i
    if (loops) {
      let loop
      for(const j of loops)
        if (!loop || j.beg > loop.beg)
          loop = j
      if (i.recEnters && i.recEnters.size) {
        i.loop = i
        i.parLoop = loop
      } else
        i.loop = loop
    }
  }
  for(const i of nodes) {
    if (i.loop) {
      const stack = []
      for(let j = i.loop;j;j = j.parLoop)
        stack.push(j)
      i.loops = new Set(i.loopStack = stack)
    }
  }
  for(const i of nodes) {
    const {loop} = i
    if (!loop)
      continue
    for(const j of i.exits) {
      if (!j.loops || !j.loops.has(loop))
        (loop.loopExits || (loop.loopExits = new Set())).add(j)
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
    if (from !== to)
      (from.loops || (from.loops = new Set())).add(to)
    from.exits.add(to)
    to.enters.add(from)
    to.recEnters.add(from)
  }
  function _makeNode(frame,tryBlock) {
    const node = {frame,tryBlock,
                  beg:-1,end:-1,
                  exits:new Set(),enters:new Set(),
                  recEnters:new Set(),
                  nonRecExits:new Set(),nonRecEnters:new Set(),
                  tryExits:new Set(),loops:null,
                  loop:null,loopExits:null,tryWrap:null}
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
    return handle.parCfgTryNode
      || (handle.parCfgTryNode = _makeNode(frame,true))
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
    i.recHandled = i.available = i.handled = false
    i.block = null
  }
  if (icfg.length < 2)
    return icfchains
  const first = icfg[0]
  _flow(first,new Set(),new Set(),new Set(),new Set())
  /** removing first `scope` op */
  return icfchains.filter(notSingle)
  function _flow(node,block,schedule,loopExits) {
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
      if (node.handled /* && !node.recHandled*/) {
        schedule.add(node)
        if (node.block.loopExit && chain.length
            && subsetOf(node.recEnters,block)) {
          chain.push(node.block)
          node.block.loopEnter = node
        }
        break
      }
      if (loopExits.has(node)) {
        schedule.add(node)
        break
      }
      node.handled = true
      node.backRec = null
      node.recExit = null
      if (node.exits.size > 1
          /** infinite may have only 1 exit */
          || node.recEnters.size) {
        const subBlock = new Set()
        subBlock.add(node)
        const residual = new Set()
        const loop = node.recEnters.size > 0
        let blockNode = {block:true,loop:node.recEnters.size > 0,loopExit:null}
        blockNode.loopEnter = node
        node.block = blockNode
        const nodeLoopExits = node.loopExits
        /** it is a loop and contains exits somewhere */
        let subLoopExits = loopExits
        if (nodeLoopExits) {
          subLoopExits = new Set(loopExits)
          nodeLoopExits.forEach(setAdd,subLoopExits)
          if (nodeLoopExits.size === 1) {
            [blockNode.loopExit] = nodeLoopExits
          }
        }
        /** the branches join's back to a single control flow somewhere */
        let hasJoins = true
        /** this loop's exits aren't exits of some outer loop */
        for(const tasks = new Set(node.exits);tasks.size;) {
          const [i] = tasks
          tasks.delete(i)
          if (!i.exits.size)
            hasJoins = false
          if (i.exits.size) {
            const threadBlock = new Set()
            const subChain = _flow(i,threadBlock,residual,subLoopExits)
            threadBlock.forEach(setAdd,subBlock)
            residual.delete(node)
            for(const i of residual) {
              if (i.handled || subLoopExits.has(i))
                continue
              if (subsetOf(i.enters,subBlock)) {
                residual.delete(i)
                i.available = true
                if (!tasks.has(i))
                  tasks.add(i)
              }
            }
          } else {
            hasJoins = false
          }
          /** maybe this extis some loops */
          if (!tasks.size && subLoopExits.size) {
            for(const i of residual) {
              /** some loop already exited before */
              if (subBlock.has(i))
                residual.delete(i)
              /** exiting to some outer block */
              else if (nodeLoopExits && nodeLoopExits.has(i)) {
                residual.delete(i)
                subLoopExits.delete(i)
                tasks.add(i)
              }
            }
            /** it still may be a chain to some outer loop */
            if (hasJoins && !tasks.size && residual.size === 1) {
              const [i] = residual
              if (i.handled /* && !i.recHandled*/) {
                residual.delete(i)
                tasks.add(i)
              }
            }
          }
          /** it continues the chain if there are nothing unhandled */
          if (hasJoins && !residual.size && tasks.size < 2) {
            [node] = tasks
            blockNode.value = [...subBlock]
            subBlock.forEach(setAdd,block)
            chain.push(blockNode)
            if (!node)
              break trav
            continue trav
          }
        }
        residual.forEach(setAdd,schedule)
        // residualRec.forEach(setAdd,scheduleRec)
        subBlock.forEach(setAdd,block)
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

/** 
 * Splits frames threads on region boundaries
 *
 * takes FrameNode[]
 * returns NestedFrameNode[]
 * type NestedFrameNode = FrameNode[] | {block:null,value:NestedFrameNode} 
 */
function splitByRegion(fchain) {
  for(const i of fchain) {
    if (i.block) {
      const value = []
      const pseudo = []
      for(const j of i.value)
        (j.tryBlock ? pseudo : value).push(j)
      i.value = value
      i.pseudo = pseudo
      i.first = i.value[0]
      
    } else {
      i.first = i.value
    }
  }
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
    const pseudo = []
    if (pos > 0) {
      _flatten(pos, skip, pseudo)
      if (skip.length)
        _chainAt(pos-1).push({block:true,value:skip, pseudo})
    }
    path = next
    _chainAt(nlen-1).push(i)
  }
  _flatten(0, [], [])
  return res
  function _flatten(pos, skip, pseudoSkip) {
    for(let j = chains.length - 1; j >= pos; --j) {
      const chain = chains[j]
      if (chain) {
        if (skip.length && path[j].enabled)
          chain.push({block:true,value:[...skip],pseudo:[...pseudoSkip]})
        for(const k of Kit.reverse(chain)) {
          if (k.block) {
            skip.unshift(...k.value)
            pseudoSkip.push(...k.pseudo)
          } else
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
 *    | {block:true,value:ICFGNode[],ret:ExitInfo}
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
      assert.ok(!i.value.loopExit || i.value.loopExit.frame === join)
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
  if (!root.hasParRegions)
    return sa
  let hasAny = false
  State.calcFrameStateVars(sa)
  const chains = []
  const inits = new Set()
  if (s.opts.cleanupFrameVars)
    throw new Error("NOT IMPLEMENTED: `par` with `cleanupFrameVars:true`")
  if (!s.opts.keepLastPure)
    throw new Error("`par` requires `keepLastPure:true`")
  Ctrl.convolveFrames(sa)
  const frames = root.cfg
  const [initJump] = root.first.exits
  const icfg = calcCfg(frames)
  /** preventing continuation assignment inlining */
  if (root.opts.scopePrefix) {
    const [exit] = root.first.exits
    exit.cloneCtx = false
  }
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
  // console.log(deb_icfg_dot(icfg))
  const fchains = frameThreads(root,icfg).filter(notSingle)
  const tchains = [].concat(...fchains.map(splitByRegion)).filter(notSingle)
  // console.log(deb_icfg_dot(icfg,fchains))
  const jchains = tchains.map(unfoldLinks).filter(needsPar)
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

/** checks if the chain has more than one effectful frames */
function needsPar(jchain) {
  let cnt = 0
  for(const i of jchain) {
    if (i.block || i.value.eff && i.value.origType === Block.letStmt)
      ++cnt
    if (cnt > 1)
      return true
  }
  return false
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
  if (root.hasParRegions)
    root.opts.scopePrefix = true
  return sa
  function _markRegions(stack,sw) {
    const enabled = stack[stack.length-1].enabled
    if (enabled)
      root.hasParRegions = true
    for(const i of sw) {
      if (i.enter && i.type === Block.chain) {
        i.value.parRegion = stack
        const {parRegion} = i.value.opts
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

export const postproc = Kit.pipe(
  emitForkApp,
  Kit.toArray,
  cleanEmptyThreads,
  contextThreading,
  adjustForkOps,
  Kit.toArray)

/**
 * resolve write/read variables conflicts using context cloning and merging
 *
 *  type Thread = Thread & {
 *    // transitive closure of thread's dependencies (`left`)
 *    closLeft: Set<Thread>,
 *    // threads which may run in parallel with this one
 *    parThreads: Set<Thread>
 *    // variables read/written by this thread
 *    set, use: Set<Sym>,
 *    // conflicting writes in this frame 
 *    // i.e. some other parallel thread also reads this variable
 *    // the value is thread unique id for this value
 *    confl: Map<Sym,Instance>,
 *    // has recursive thread - parallel loop
 *    loop: boolean,
 *    // closure of confl 
 *    subst: Map<Syn, Instance> 
 *  }
 *
 *  type Fork = Fork & {
 *    stack: Thread[], // other forks' threads on which this fork is started
 *    loop: boolean, // fork is a par loop body
 *    loopVars?: Sym[], // vars handled by a TLS of this loop
 *    loopLevel?: number, // nesting level for this loop
 *    parentLoopFork?: Fork,
 *    hasParentTls, hasTls: boolean // does we need to create TLS and 
 *  }
 * 
 *  describes conflicting variable for each fork
 *  type CopyInfo = {
 *    sym,mask:Sym,
 *    fork:Fork,
 *    copies:Set<Sym>,
 *    num:number,
 *    parent:Instance,
 *    loopMask: Sym,
 *  }
 *
 *  type Instance = {
 *    copy: Sym,
 *    id: number,
 *    fork: Fork, thread?:Thread,
 *    info: CopyInfo, // copies deps context
 *    // vars dependencies within single fork
 *    locSucc:Instance[],locPred:Instance[], 
 *    locMask:Symbol // local mask variable
 *  }
 * 
 *  type Sym = Sym & {
 *    // where to store this variable (in case of loop's fork it is a TLS)
 *    ownerFork: Fork
 *  }
 */
function contextThreading(si) {
  const sa = Kit.toArray(si)
  const root = sa[0].value
  if (!root.hasPar)
    return sa
  const s = Kit.auto(Block.applyIgnoreResult(sa))
  const {opts} = root
  // if (asClosure && !opts.defunct)
  // throw new Error(
  //      "Not implemented: `parThreadState:\"closure\"` without `defunct:true`")
  const asClosure = opts.parThreadState === "closure"
  const asContext = opts.parThreadState === "context"
  if (!asClosure && !asContext)
    throw new Error(
      "Invalid value for \"parThreadState\": \"${opts.parThreadState}\"")
  const vars = new Set()
  let cnt = 0
  const {errFrameRedir,resFrameRedir,savedDecls,implFrame} = root
  const tempSavedDecls = implFrame ? implFrame.value.savedDecls : savedDecls
  /** detecting conflicting variables writes */
  for(const fork of root.parDefs) {
    const {threads} = fork
    for(const i of threads) {
      /** transitive closure thread's dependency */
      const clos = i.closLeft = new Set()
      i.fork = fork
      for(const j of i.left) {
        clos.add(j)
        j.closLeft.forEach(setAdd,clos)
      }
      const parThreads = i.parThreads = new Set(threads)
      parThreads.delete(i)
      for(const j of clos) {
        j.parThreads.delete(i)
        parThreads.delete(j)
      }
      const set = i.set = new Set()
      const use = i.use = new Set()
      i.loop = false
      for(const j of i.right) {
        _copyVars(j.wv, set)
        _copyVars(j.sv, set)
        if (j == fork.loop) {
          i.loop = true
        } else {
          _copyVars(j.wv, use)
          _copyVars(j.sv, use)
          _copyVars(j.rv, use)
        }
      }
      i.confl = new Map()
    }
  }
  _contextTree(root.first,null)
  for(const fork of root.parDefs) {
    let loopLevel = fork.loopLevel = -1
    let loopVars
    fork.loopVars = null
    const pthread = fork.parentThread
    const pfork = pthread && pthread.fork
    const plfork = fork.parentLoopFork
          = pfork && (pfork.loop ? pfork : pfork.parentLoopFork)
    if (fork.loop) {
      loopLevel = fork.loopLevel = plfork ? plfork.loopLevel + 1 : 0
      loopVars = fork.loopVars = new Set()
    } else if (plfork) {
      loopLevel = fork.loopLevel = plfork.loopLevel
      loopVars = fork.loopVars = plfork.loopVars
    }
    const forkConfls = fork.confl = new Map()
    /** # calculating threads read/write conflicts */
    const rec = fork.loop && fork.threads[fork.threads.length-1]
    for(const thread of fork.threads) {
      const {parThreads,left,use,confl} = thread
      for(const i of parThreads) {
        for(const sym of i.set) {
          if (use.has(sym) && !confl.has(sym)) {
            let info = forkConfls.get(sym)
            if (info == null) {
              let mask = null
              if (!i.loop) {
                mask = Kit.scope.newSym(`${sym.orig}$$`)
                mask.ownerFork = fork
                if (loopLevel < 0)
                  savedDecls.set(mask,{raw:null})
                else
                  loopVars.add(mask)
              }
              forkConfls.set(sym, info = {sym,mask,fork,
                                          copies:new Set(),num:-1,parent:null})
            }
            const id = ++info.num
            const copy = Kit.scope.newSym(`${sym.orig}$`)
            const {mask} = info
            const inst = {sym,id,fork,copy,info,thread:i.loop?null:i,locSucc:[],
                          locPred:[],locMask:null}
            copy.ownerFork = fork
            confl.set(sym,inst)
          }
        }
      }
    }
    /** # vars conflicting only with the loop's don't need masks here */
    if (fork.loop) {
      const rec = fork.threads[fork.threads.length-1]
      const loopMasks = fork.loopMasks = []
      for(const sym of rec.set) {
        const info = forkConfls.get(sym)
        if (!info)
          continue
        const loopMask = info.loopMask = Kit.scope.newSym(`${sym.orig}$$$`)
        loopMasks.push(loopMask)
        loopMask.ownerFork = plfork
        if (plfork)
          plfork.loopVars.add(loopMask)
        else
          savedDecls.set(loopMask,{})
      }
    }
    /** # parent thread should also assign its children variable copies */
    for(const thread of fork.threads) {
      const {confl} = thread
      for(const i of thread.closLeft) {
        const {set,confl:lconfl} = i
        for(const [sym,inst] of confl) {
          if (set.has(sym) && !lconfl.has(sym)) {
            const {info} = inst
            const id = info.num++
            lconfl.set(sym,{sym,id,fork,copy:null,info,thread,
                            locSucc:[],locPred:[],locMask:null})
          }
        }
      }
    }
    /** # calculating `locPred`/`locSuc` for each copy */
    for(const thread of fork.threads) {
      const locals = thread.locals = new Map()
      const {confl} = thread
      for(const i of thread.left) {
        for(const [sym,insts] of i.locals) {
          const inst = confl.get(sym)
          if (inst) {
            for(const pinst of insts) {
              if (pinst !== inst) {
                inst.locPred.push(pinst)
                pinst.locSucc.push(inst)
              }
            }
          } else
            Kit.mapArr(locals, sym).push(...insts)
        }
      }
      for(const [sym,inst] of confl)
        locals.set(sym,[inst])
    }
    /** 
     * # removing instance copy if there are less than two sources  
     * # or generating local mask to resolve conflicts
     */
    for(const thread of fork.threads) {
      const {confl} = thread
      for(const [sym,inst] of confl) {
        if (inst.locPred.length > 1) {
          const mask = inst.locMask
            = Kit.scope.newSym(`${sym.orig}$${inst.id}$`)
          mask.ownerFork = fork
          if (loopVars)
            loopVars.add(mask)
          else
            savedDecls.set(mask,{raw:null})
        }
        if (inst.copy) {
          inst.info.copies.add(inst)
          if (loopVars)
            loopVars.add(inst.copy)
          else
            savedDecls.set(inst.copy,{raw:null})
        }
      }
    }
    /** # propagating substitutions from parent forks */
    for(const thread of fork.threads) {
      const {confl} = thread
      const subst = thread.subst = new Map(confl)
      if (pthread) {
        for(const [sym,pinst] of pthread.subst) {
          const inst = subst.get(sym)
          if (inst)
            inst.info.parent = pinst
          else
            subst.set(sym, pinst)
        }
      }
    }
  }
  let tempTlsSym
  let updTempCopyVar
  for(const fork of root.parDefs) {
    let hasParentTls = fork.hasParentTls = false
    const hasTls = fork.hasTls = fork.loop && fork.confl.size !== 0
    if (fork.parentThread) {
      const pfork = fork.parentThread.fork
      hasParentTls = fork.hasParentTls = pfork.hasParentTls || pfork.hasTls
    }
    if (hasTls) {
      if (!tempTlsSym)
        tempSavedDecls.set(tempTlsSym = Kit.scope.newSym(),{})
      fork.tlsCopy = tempTlsSym
    } else if (hasParentTls) {
      fork.tlsCopy = tlsSym
    } else
      fork.tlsCopy = null
  }
  for(const {loopVars} of root.parDefs)
    if (loopVars)
      State.allUniqFields(loopVars,"_")
  return _substVarThreads()
  function _copyVars(from,to) {
    for(const i of from) {
      if (i.local && !i.extBind)
        continue
      to.add(i)
    }
  }
  function _contextTree(start,thread) {
    const jobs = [start]
    const vars = new Map()
    while(jobs.length) {
      const frame = jobs.shift()
      if (frame.dynamicJump) {
        const dst = vars.get(frame)
        if (dst)
          jobs.push(dst)
        continue
      }
      if (frame._contextTreeVisited)
        continue
      frame._contextTreeVisited = true
      frame.parThread = thread && thread.loop
        ? (thread.fork.parentThread || false) : thread
      for(const i of frame.exits) {
        const fork = i.parJoin
        if (fork && thread && !thread.loop)
          fork.parentThread = thread
        const subThread = i.parThread
        if (subThread) {
          _contextTree(i.goto,subThread)
        } else {
          if (i.goto)
            jobs.push(i.goto)
          if (i.indirJumps) {
            for(const [concr,abs] of i.indirJumps)
              vars.set(abs, concr)
          }
        }
      }
    }
  }
  function* _substJumps(sw) {
    for(const i of sw) {
      if (i.enter) {
        switch(i.type) {
        case Ctrl.jump:
        case Block.letStmt:
          if (!i.value.goto)
            break
          const {tmpVar} = i.value
          if (!tmpVar)
            break
          if (tmpVar.thread) {
            if (tmpVar.thread.fork.threads[0] !== tmpVar.thread)
              break
            const head = tmpVar.thread.fork
            if (head && !head.removed)
              yield* head.loop ? _initLoop(head,true) : _init(head)
          } else if (tmpVar.parLoop) {
            yield* _initLoop(tmpVar.parLoop,false)
          }
            
          break
        }
      }
      yield i
    }
  }
  function* _substExpr(dict,fork,frame,sw) {
    for(const i of sw) {
      if (i.enter) {
        switch(i.type) {
        case Tag.Identifier:
          const {sym} = i.value
          if (sym) {
            const inst = dict.get(sym)
            if (inst) {
              yield* _cref(i.pos,inst,fork)
              s.close(i)
              continue
            }
          }
          break
        case Tag.UpdateExpression:
        case Tag.AssignmentExpression:
          const lhs = s.cur()
          const upd = i.type === Tag.UpdateExpression
          const insts = []
          let buf
          if (upd) {
            if (lhs.type !== Tag.Identifier && lhs.value.sym)
              break
            const inst = dict.get(lhs.value.sym)
            if (!inst)
              break
            buf = [..._cref(lhs.pos,inst,fork)]
            Kit.skip(s.one())
            insts.push(inst)
          } else {
            const op = i.value.node.operator
            buf = []
            for(const j of s.one()) {
              if (j.enter && j.type === Tag.Identifier && j.value.lhs) {
                const {sym} = j.value
                const inst = dict.get(sym)
                if (inst) {
                  insts.push(inst)
                  buf.push(..._cref(j.pos,inst,fork))
                  s.close(j)
                  continue
                }
              }
              buf.push(j)
            }
          }
          if (!insts.length) {
            yield i
            yield* buf
            continue
          }
          const lab = s.label()
          yield s.enter(i.pos, Tag.SequenceExpression)
          yield s.enter(Tag.expressions, Tag.Array)
          let pos = Tag.push
          const slab = s.label()
          if (!i.value.ignoreResult) {
            yield s.enter(Tag.push,Tag.AssignmentExpression,
                          {node:{operator:"="}})
            if (!updTempCopyVar) {
              updTempCopyVar = Kit.scope.newSym("tmp")
              tempSavedDecls.set(updTempCopyVar,{})
            }
            yield s.tok(Tag.left,Tag.Identifier,{sym:updTempCopyVar})
            pos = Tag.right
          }
          yield s.enter(pos, i.type, i.value)
          yield* buf
          if (!upd)
            yield* _substExpr(dict,fork,frame,s.one())
          yield* slab()
          s.close(i)
          for(const j of insts)
            yield* _assign(fork,j)
          if (!i.value.ignoreResult)
            yield s.tok(Tag.push,Tag.Identifier,{sym:updTempCopyVar})
          yield* lab()
          continue
        }
      }
      yield i
    }
  }
  function* _substVarThreads() {
    for(const i of s) {
      yield i
      if (i.enter) {
        switch(i.type) {
        case Block.frame:
          const thread = i.value.parThread
          yield* _substJumps(
            thread && !thread.removed
              ? _substExpr(thread.subst,thread.fork,i.value,s.sub()) : s.sub())
          break
        }
      }
    }
  }
  /** reference to a variable stored in TLS of `varFork` in `ctxFork` */
  function* _tlsRef(pos, varFork, ctxFork, name) {
    assert.ok(name)
    assert.ok(varFork.loopLevel >= 0)
    const loops = ctxFork.loopLevel - varFork.loopLevel
    assert.ok(loops >= 0)
    const lab = s.label()
    yield s.enter(pos, Tag.MemberExpression)
    for(let i = 0; i < loops; ++i)
      yield s.enter(Tag.object, Tag.MemberExpression)
    yield s.tok(Tag.object, Tag.Identifier, {sym:tlsSym})
    for(let i = 0; i < loops; ++i) {
      yield s.tok(Tag.property, Tag.Identifier, {node:{name:"p"}})
      yield* s.leave()
    }
    yield s.tok(Tag.property,Tag.Identifier,{node:{name}})
    yield* s.leave()
  }
  /** outputs reference to a symbol if `fromFork` fork or some its ancestor */
  function* _ref(pos, ctxFork, sym) {
    const varFork = sym.ownerFork
    if (!varFork || varFork.loopLevel < 0)
      yield s.tok(pos, Tag.Identifier, {sym})
    else
      yield* _tlsRef(pos, varFork, ctxFork, sym.fieldName)
  }
  /** reference to a nearest copy variable */
  function* _cref(pos, inst, ctxFork) {
    for(let pinst = inst; pinst != null; pinst = pinst.info.parent) {
      if (pinst.copy) {
        yield* _ref(pos, ctxFork, pinst.copy)
        return
      }
    }
    yield s.tok(pos, Tag.Identifier, {sym:inst.sym})
  }
  /** reference to a paranet's fork variable */
  function* _pref(pos,info,ctxFork) {
    if (info.parent)
      yield* _cref(pos,info.parent,ctxFork)
    else 
      yield s.tok(pos,Tag.Identifier,{sym:info.sym})
  }
  function* _assignRef(ctxFork, sym, type, value) {
    yield s.enter(Tag.push,Tag.AssignmentExpression,{node:{operator:"="}})
    yield* _ref(Tag.left,ctxFork,sym)
    yield s.tok(Tag.right,type,value)
    yield* s.leave()
  }
  /** initializes loop's TLS object */
  function* _initLoop(fork,copy) {
    if (!fork.hasTls)
      return
    const plfork = fork.parentLoopFork
    const lab = s.label()
    if (!copy)
      for(const i of fork.loopMasks)
        yield* _assignRef(plfork,i,Tag.NumericLiteral,{node:{value:0}})
    yield s.enter(Tag.push,Tag.AssignmentExpression,{node:{operator:"="}})
    fork.tlsCopy = tempTlsSym
    yield s.tok(Tag.left, Tag.Identifier, {sym:tempTlsSym})
    yield s.enter(Tag.right,Tag.ObjectExpression)
    yield s.enter(Tag.properties,Tag.Array)
    yield s.enter(Tag.push,Tag.ObjectProperty)
    yield s.tok(Tag.key,Tag.Identifier,{node:{name:"i"}})
    if (copy)
      yield* s.toks(Tag.value,`=$I.i+1`,tlsSym)
    else
      yield s.tok(Tag.value,Tag.NumericLiteral,{node:{value:0}})
    yield* s.leave()
    if (fork.hasParentTls) {
      yield s.enter(Tag.push,Tag.ObjectProperty)
      yield s.tok(Tag.key,Tag.Identifier,{node:{name:"p"}})
      if (copy) {
        yield s.enter(Tag.value,Tag.MemberExpression)
        yield s.tok(Tag.object,Tag.Identifier,{sym:tlsSym})
        yield s.tok(Tag.property,Tag.Identifier,{node:{name:"p"}})
        yield* s.leave()
      } else {
        yield s.tok(Tag.value,Tag.Identifier,{sym:tlsSym})
      }
      yield* s.leave()
    }
    for(const [sym,info] of fork.confl) {
      if (info.mask)
        yield* _prop(info.mask.fieldName,Tag.NumericLiteral,{node:{value:0}})
      else if (!copy)
        continue
      for(const i of info.copies) {
        if (i.locMask)
          yield* _prop(i.locMask.fieldName,Tag.NumericLiteral,{node:{value:0}})
        yield s.enter(Tag.push,Tag.ObjectProperty)
        assert.ok(i.copy.fieldName)
        yield s.tok(Tag.key,Tag.Identifier,{node:{name:i.copy.fieldName}})
        if (copy && info.mask) {
          yield s.enter(Tag.value,Tag.MemberExpression)
          yield s.tok(Tag.object,Tag.Identifier,{sym:tlsSym})
          assert.ok(i.copy.fieldName)
          yield s.tok(Tag.property,Tag.Identifier,
                      {node:{name:i.copy.fieldName}})
          yield* s.leave()
        } else {
          yield* _pref(Tag.value,info,plfork)
        }
        yield* s.leave()
      }
    }
    yield* lab()
  }
  /** initializes non-loop fork TLS */
  function* _init(fork) {
    for(const [sym,info] of fork.confl) {
      let needsMaskInit = !!info.mask
      const lab = s.label()
      yield s.enter(Tag.push,Tag.AssignmentExpression,{node:{operator:"="}})
      if (info.mask)
        yield* _ref(Tag.left,fork,info.mask)
      for(const i of info.copies) {
        if (!i.locMask)
          continue
        yield s.enter(Tag.right,Tag.AssignmentExpression,{node:{operator:"="}})
        yield* _ref(Tag.left,fork,i.locMask)
      }
      yield s.tok(Tag.right,Tag.NumericLiteral,{node:{value:0}})
      yield* lab()
      if (info.copies.size) {
        let pos = Tag.push
        for(const i of info.copies) {
          yield s.enter(pos,Tag.AssignmentExpression,{node:{operator:"="}})
          yield* _ref(Tag.left,fork,i.copy)
          pos = Tag.right
        }
        yield* _pref(Tag.right,info,fork)
        yield* lab()
      }
    }
  }
  function* _tid(ctxFork,varFork,value) {
    if (value != null)
      yield s.tok(Tag.right,Tag.NumericLiteral,{node:{value}})
    else {
      yield* _tlsRef(Tag.right, varFork, ctxFork, "i")
    }
  }
  function* _maskCond(ctxFork,mask,loopFork,value) {
    yield s.enter(Tag.push, Tag.LogicalExpression, {node:{operator:"||"}})
    yield s.enter(Tag.left, Tag.BinaryExpression, {node:{operator:">"}})
    yield* _ref(Tag.left,ctxFork,mask)
    yield* _tid(ctxFork,loopFork,value)
    yield* s.leave()
    yield s.enter(Tag.right, Tag.SequenceExpression)
    yield s.enter(Tag.expressions, Tag.Array)
    yield s.enter(Tag.push, Tag.AssignmentExpression, {node:{operator:"="}})
    yield* _ref(Tag.left,ctxFork,mask)
    yield* _tid(ctxFork,loopFork,value)
    yield* s.leave()
  }
  function* _assignLoc(ctxFork,inst) {
    for(const sinst of inst.locSucc) {
      if (!sinst.copy)
        continue
      const lab = s.label()
      let pos = Tag.push
      if (sinst.locMask)
        yield* _maskCond(ctxFork,sinst.locMask,null,inst.id,false)
      yield s.enter(pos, Tag.AssignmentExpression, {node:{operator:"="}})
      yield* _cref(Tag.left, sinst, sinst.fork)
      yield* _cref(Tag.right, inst, inst.fork)
      yield* lab()
      yield* _assignLoc(ctxFork,sinst)
    }
  }
  /** # emits assignment for each variable change */
  function* _assign(ctxFork, inst) {
    const lab = s.label()
    const {fork, info} = inst
    yield* _assignLoc(ctxFork,inst)
    if (inst.copy) {
      if (info.mask)
        yield* _maskCond(ctxFork,info.mask,null,inst.id,inst.id === info.num)
      if (fork.loop && info.loopMask)
        yield* _maskCond(ctxFork,info.loopMask,fork,null,false)
      yield s.enter(Tag.push, Tag.AssignmentExpression, {node:{operator:"="}})
      yield* _pref(Tag.left, info, fork)
      yield* _cref(Tag.right, inst, fork)
      yield* s.leave()
    }
    if (inst.info.parent) {
      yield* _assign(ctxFork, inst.info.parent)
      yield* lab()
    }
  }
  function* _prop(name, type, value) {
    assert.ok(name)
    yield s.enter(Tag.push, Tag.ObjectProperty)
    yield s.tok(Tag.key, Tag.Identifier, {node:{name}})
    yield s.tok(Tag.value, type, value)
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
    dyn.instances.delete(oldGoto)
    dyn.instances.add(newGoto)
    jump.indirJumps.delete(oldGoto)
    jump.indirJumps.set(newGoto,dyn)
    jump.frameArgs.set(dyn.declSym,newGoto.declSym)
  }
}


const emptySet = new Set()
const emptyMap = new Map()

function notSingle(chain) { return chain.length > 1 }
function notRemoved(i) { return !i.removed }

function subsetOf(u, s) {
  for(const i of u)
    if (!s.has(i))
      return false
  return true
}

