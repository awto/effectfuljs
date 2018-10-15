/** 
 * implicit parallelization, detecting Applicative combinators 
 */
import * as Kit from "./kit"
import {Tag} from "./kit"
import * as Block from "./block"
import * as Bind from "./bind"
import * as assert from "assert"
import * as Ctrl from "./control"

const emptySet = new Set()
export const shareId = Kit.sysId("share")
export const forkId = Kit.sysId("fork")

/** 
 * returns edges for variables dependencies
 *
 *  type Node = Node & {fv:Set<Sym>, bv:Set<Sym>} 
 */
function nodeVars(node) {
  const fv = node.fv = new Set()
  const bv = node.bv = new Set()
  function content(toks) {
    for(const i of toks) {
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
  if (node.skip) {
    for(const i of node.value) {
      for(const j of i.steps)
        content(j.content)
    }
  } else
    content(node.value.content)
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
  let x = 0
  for(const src of nodes) {
    src.x = x++
    for(const v of src.bv) {
      let srcs = bv.get(v)
      if (srcs == null)
        bv.set(v, srcs = [])
      srcs.push(src)
    }
  }
  for(const dst of nodes) {
    for(const v of dst.fv) {
      const srcs = bv.get(v)
      if (srcs) {
        for(const src of srcs)
          if (src !== dst)
            res.push(src.x > dst.x ? [dst,src] : [src,dst])
      }
    }
  }
  /*
  const bv = new Map()
  const res = []
  for(const dst of nodes) {
    for(const i of dst.fv) {
      const src = bv.get(i)
      if (src)
        res.push([src,dst])
    }
    for(const i of dst.bv)
      bv.set(i, dst)
  }
  */
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
  for(const [src,dst] of edges)
    map.get(dst).push(src)
  return res
}

/**
 * returns the resulting graph (type is recursive)
 *
 * Input deps graph saying computation in `src` uses `dst`s (no trans clos)
 * 
 *    graph: {
 *      src: Node,
 *      dst: Node[]
 *    }
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
 *      steps: Steps[] 
 *      // shared object describing `fork` operation for this thread
 *      fork: ForkVal,
 *      // the threads's reference counter
 *      rc: number,  
 *      // first: FrameVal, === frames[0].exit
 *      reff: boolean        // right is effectful
 *      // nodes available after this node is computed
 *      // so the node itself and the ones it depends on
 *      scope: Set<Node>,
 *      // last frame for this thread (usually contains `join` in its exit)
 *      lastStep: Step
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
 *    type ForkVal = {
 *      // threads to be started by this forks
 *      tuple: Thread[],
 *      // this fork's dependencies
 *      left: Thread[],
 *      // jump to replace with the fork
 *      // first effectful let in the first frame
 *      enter: LetVal,
 *      // helper memo for `exprs` construction
 *      exprMemo: Map<Thread, ForkExpr>,
 *      // stack of fork expressions describing this fork
 *      exprs: ForkExpr[],
 *      // fork's rank in dependencies DAG
 *      rank: number,
 *      // actual computed fork expression, built from `exprs`
 *      rootExpr: ForkExpr
 *    }
 *
 *    type ForkExpr = {
 *        // reference counter
 *        rc: number
 *      } & ({
 *        fork: true,
 *        // the fork joins into this fork
 *        joinFork: ForkVal | null,
 *        // the fork joins into this frame
 *        joinFrame: FrameVal
 *        // parameters of the fork
 *        tup: Set<ForkExpr>
 *      } | {
 *        fork: false,
 *        // last fork appended to this thread (during optimization)
 *        tailFork: ForkVal | null
 *      })
 *
 *  if letStmt can be parallelized:
 * 
 *   type LetVal = LetVal & {
 *     parFork?: ForkVal
 *   }
 *
 *   type TokVal = Val & { content: Token[] }
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
    return

  /** 
   * ## calculating fork points 
   *
   * Several nodes can start running together if they have
   * same dependency list (`left`). Calculating shared `fork` 
   * objects for them.
   */
  const forks = new Map()
  for(const i of threads) {
    const lid = i.left.map(i => i.id).join()
    let fork = forks.get(lid)
    if (!fork)
      forks.set(lid,fork = {tuple:[], left:i.left})
    i.fork = fork
    fork.tuple.push(i)
  }
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
      setStepTail(cur, next.frame)
      if (!cur.skip)
        next.frame.patSym = cur.exit.sym
    }
    i.rank = Math.max(0,...i.left.map(i => i.rank)) + 1
  }
  const forksArr = [...forks.values()]
  for(const i of forksArr)
    i.rank = Math.max(...i.tuple.map(i => i.rank))
  const maxRank = Math.max(...forksArr.map(i => i.rank))
  const firstFrame = first.skip ? first.value[0] : first.value.ref
  for(const fork of forksArr) {
    fork.head = s.tok(Tag.push, Block.frame,
                      {declSym:Kit.scope.newSym("_"),savedDecls:new Map(),
                       resFrameRedir:firstFrame.resFrameRedir,
                       catchContRedir:firstFrame.catchContRedir}).value
  }
  const firstHead = forksArr[0].head
  for(const i of firstFrame.enters)
    i.goto = firstHead
  for(const i of forksArr)
    liftForkExprs(i)
  /** calculating root expression */
  for(const fork of forksArr) {
    const {exprs} = fork
    for(const i of exprs) {
      if (i.fork)
        for(const j of i.tup)
          ++j.rc
    }
    const tup = new Set()
    for(const i of exprs) {
      if (i.rc === 0)
        tup.add(i)
      if (i.fork) {
        i.joinFrame = i.joinFork ? i.joinFork.head : root.pureExitFrame
      } else {
        i.tailFork = null
      }
    }
    if (tup.size === 1)
      [fork.rootExpr] = tup
    else
      fork.rootExpr = {fork:true,rc:0,tup,joinFork:null,joinFrame:resFrameRedir}
  }
  setExprTail(forksArr[0].rootExpr, exitGoto)
  for(const i of forksArr)
    i.rootExpr = optForkExpr(i.rootExpr)
  for(const i of forksArr)
    calcExprRefCount(i.rootExpr)
  root.parFrames.push([...emitFrames()])
  root.parDefs.push(threads)
  return
  
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
  /**
   * Constructs fork expressions 
   */
  function liftForkExprs(fork) {
    if (fork.exprs)
      return
    const exprs = fork.exprs = []
    const exprMemo = fork.exprMemo = new Map()
    /** en expression for each thread */
    for(const i of fork.tuple) {
      const tip = {fork: false,rc:0,value:i,rc:0}
      fork.exprMemo.set(i, tip)
      fork.exprs.push(tip)
    }
    /** if no deps it is a least upper bound itself */
    if (!fork.left.length) {
      fork.lub = fork
      fork.lubExpr = null
      return
    }
    for(const i of fork.left)
      liftForkExprs(i.fork)
    const store = new Map()
    /** grouping dependencies by threads where they are started */
    for(const i of fork.left) {
      let t = store.get(i.fork)
      if (!t)
        store.set(i.fork, t = new Set())
      const em = i.fork.exprMemo.get(i)
      assert.ok(em)
      t.add(em)
    }
    if (store.size === 1) {
      /** all deps are in the same thread, simply creating fork expression */
      const [[nf, tup]] = store
      const expr = {fork:true,rc:0,tup,joinFork:fork}
      nf.exprs.push(expr)
      for(const i of fork.tuple) {
        assert.ok(i.fork === fork)
        nf.exprMemo.set(i, expr)
      }
      fork.lub = nf
      fork.lubExpr = expr
    } else {
      /**
       * not all deps are located in the same thread
       * looking for a common ancestor
       */
      const lubs = new Set()
      for(const [nf,tup] of store) {
        let expr
        if (tup.size === 1)
          [expr] = tup
        else {
          expr = {fork:true,rc:0,tup,joinFork:null}
          nf.exprs.push(expr)
        }
        lubs.add(nf)
      }
      commonLUB(lubs,fork)
    }
  }
  /** looks for a common ancestor for a few fork threads */
  function commonLUB(forks, destFork) {
    const lubs = new Map()
    for(const i of forks) {
      let t = lubs.get(i.lub)
      if (i.lubExpr) {
        if (t == null)
          lubs.set(i.lub, t = new Set())
        t.add(i.lubExpr)
      }
    }
    for(;;) {
      let maxRank = -1
      let lub, tup
      //TODO: priority queue
      for(const [l,d] of lubs) {
        if (l.rank > maxRank) {
          maxRank = l.rank
          lub = l
          tup = d
        }
      }
      lubs.delete(lub)
      if (lubs.size) {
        let t = lubs.get(lub.lub)
        if (t == null)
          lubs.set(lub.lub, t = new Set())
        t.add(lub.lubExpr)
        lub.exprs.push({fork:true,rc:0,tup,joinFork:null})
      } else {
        destFork.lub = lub
        lub.exprs.push(destFork.lubExpr={fork:true,rc:0,tup,joinFork:destFork})
        break
      }
    }
  }
  function calcExprRefCount(expr) {
    expr.rc++
    if (expr.rc === 1 && expr.fork) {
      for(const i of expr.tup)
        calcExprRefCount(i)
    }
  }
  /**
   * optimizing fork expressions
   *   - removing single thread forks
   *
   *      fork [fork [X] join, ...Z] Y === fork [X, ...Z] y
   *      fork [X] not-join (X referred only once) === X[goto = not-join]
   *      fork [fork Xs goto] pure = fork Xs goto
   *      forks with same Xs and goto can be removed 
   *         - Xs is associative, commutative
   */
  function optForkExpr(expr) {
    if (expr.opt)
      return expr.opt
    if (!expr.fork)
      return expr.opt = {fork:false,value:expr.value,tailFork:expr.tailFork,rc:0}
    const tup = [...expr.tup].map(optForkExpr).filter(nonEmptyThread)
    if (tup.length === 1) {
      const [child] = tup
      if (child.rc === 1) {
        setExprTail(child,expr.joinFrame,expr.joinFork)
        child.rc = 0
        return expr.opt = child
      }
    }
    return expr.opt = {fork:true,tup,joinFrame:expr.joinFrame,
                       joinFork:expr.joinFork,rc:0}
  }
  /** checks if the expression does anything */
  function nonEmptyThread(expr) {
    if (expr.fork)
      return expr.tup.length > 0
    const thread = expr.value
    if (thread.steps.length !== 2)
      return true
    const [step] = thread.steps
    if (step.skip || !step.toks || step.toks.length !== 1)
      return true
    const [tok] = step.toks
    if (tok.origType !== Ctrl.jump)
      return true
    if (tok.goto !== pureExitFrame)
      return true
    step.removed = true
    return false
    
  }
  /** sets destination for a step */
  function setStepTail(step, dest) {
    if (step.skip) {
      for(const i of step.after.enters)
        i.goto = dest
    } else
      step.exit.goto = dest
  }
  /** sets destination for fork expression */
  function setExprTail(expr, frame, fork) {
    if (expr.fork) {
      if (expr.joinFork) {
        setExprTail(expr.joinFork.rootExpr, frame, fork)
      } else {
        expr.joinFork = fork
        expr.joinFrame = frame
      }
    } else {
      if (expr.tailFork) {
        setExprTail(expr.tailFork.rootExpr, frame, fork)
      } else {
        setStepTail(expr.value.lastStep, frame)
        // expr.value.lastStep.exit.goto = frame
        expr.tailFork = fork
      }
    }
  }
  /** emits parallel frames */
  function* emitFrames() {
    for(const i of forksArr) {
      if (i.rootExpr) {
        const frame = i.head
        yield s.enter(Tag.push,Block.frame,i.head)
        // i.tuple[0].steps[0].enters //TODO:
        for(const expr of flattenExpr(frame, i.rootExpr)) {
          const lab = s.label()
          const reflected = !expr.root
          let tmpVar = expr.tmpVar
          if (expr.rc > 1) {
            yield s.enter(Tag.push, Block.app,{reflected,sym:shareId,tmpVar})
            tmpVar = null
          }
          if (expr.fork) {
            yield s.enter(Tag.push,Block.letStmt,{
              eff:true,reflected,goto:expr.joinFrame,
              ref:frame,tmpVar,noInline:expr.rc > 1})
            if (expr.tup.length === 1) {
              const [i] = expr.tup
              yield s.tok(Tag.push,Tag.Identifier,{sym:i.tmpVar})
            } else {
              yield s.enter(Tag.push,Block.app,{
                result:false,sym:forkId})
              yield s.enter(Tag.push,Tag.ArrayExpression)
              yield s.enter(Tag.elements,Tag.Array)
              for(const i of expr.tup)
                yield s.tok(Tag.push,Tag.Identifier,{sym:i.tmpVar})
            }
          } else {
            const next = expr.value.steps[0].frame
            // TODO: propagate share
            if (expr.rc > 1) {
              next.noInline = true
            }
            yield s.tok(Tag.push,Ctrl.jump,{
              ref:frame,goto:next,reflected,tmpVar})
          }
          yield* lab()
        }
        yield* s.leave()
      }
    }
    for(const i of threads) {
      for(const j of i.steps) {
        if (!j.skip && j.toks && !j.removed) {
          yield s.enter(Tag.push, Block.frame, j.frame)
          for(const l of j.toks)
            yield* l.content
          yield* s.leave()
        }
      }
    }
  }
  /** 
   * returning list of fork expressions ordered to resemble original order 
   * as much as possible
   */
  function flattenExpr(frame,expr) {
    const res = []
    _flattenExpr(expr, res, true)
    return res.sort(byId)
    function _flattenExpr(expr,res,root) {
      if (expr.id != null)
        return
      expr.root = root
      if (root)
        expr.tmpVar = null
      else
        frame.savedDecls.set(expr.tmpVar = Kit.scope.newSym(),{})
      res.push(expr)
      if (expr.fork) {
        let maxRank = 0
        for(const i of expr.tup) {
          _flattenExpr(i,res,false)
          if (i.id > maxRank)
            maxRank = i.id
        }
        expr.id = maxRank + 1
      } else {
        expr.id = expr.value.id * 2
      }
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
  _collect(first, null, [], emptyMap)
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

const forkSym = Kit.sysId("fork")

const emptyMap = new Map()

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
  if (!root.opts.par)
    return sa
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
    deriveBlocks(graph, s, root)
  }
  if (!root.parDefs || !root.parDefs.length)
    return s
  const res = Kit.toArray(substFrames(s))
  Ctrl.convolveFrames(res)
  return res
}

function byId(a,b) { return a.id - b.id }
