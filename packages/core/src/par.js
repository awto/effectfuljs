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
 * for each frame calculates LHS/RHS for variables within frame's scope
 * it is different to stateVars, since the effectful bound variable is bounds
 * in the former frame 
 */
function calcVars(sa) {
  const s = Kit.auto(sa)
  for(const i of s) {
    if (i.enter && i.type === Block.frame) {
      const bv = i.value.bv = new Set()
      // if (i.value.patSym)
      //  bv.add(i.value.patSym)
      const fv = i.value.fv = new Set()
      for(const i of s.sub()) {
        if (i.enter) {
          switch(i.type) {
          case Block.letStmt:
            if (i.value.sym /*&& !i.value.eff*/)
              bv.add(i.value.sym)
            break
          case Tag.Identifier:
            const sym = i.value.sym
            if (!i.value.sym)
              break
            if (s.opts.parAllLocals) {
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
      bv.forEach(fv.delete,fv)
    }
  }
}

/** 
 * return initial list of graph nodes for each chain
 *
 *   type Node = {root:Val}
 *   type Val = Val & {parOp: Token[]}
 *   type FrameVal = FrameVal & { parOps: Val[] }
 */
function getNodes(chains, sa) {
  const heads = new Set()
  const frames = new Set()
  for(const [h, ...t] of chains) {
    heads.add(h)
    for(const i of t)
      frames.add(i.ref)
  }
  const s = Kit.auto(sa)
  for(const i of s) {
    if (i.enter && i.type === Block.frame) {
      if (frames.has(i.value)) {
        const ops = i.value.parOps = []
        for(let j; (j = s.curLev()) != null; j.value.parOp = [...s.one()]) {
          ops.push(j.value)
          if (!j.value.ref)
            i.value.ref = i.value
        }
      } else {
        for(const j of s.sub()) {
          if (j.enter && j.type === Block.letStmt
              && j.value.eff && heads.has(j.value)) {
            j.value.parOp = [j,...s.sub(),s.close(j)]
          }
        }
      }
    }
  }
  return chains.map(([h, ...t]) =>
                    [h, ...[].concat(...t.map(i => i.ref.parOps))])
}

/** 
 * returns edges for variables dependencies
 *
 *  type Node = Node & {fv:Set<Sym>, bv:Set<Sym>} 
 */
function nodeVars(node) {
  const fv = node.fv = new Set()
  const bv = node.bv = new Set()
  for(const i of node.parOp) {
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
        if (node.opts.parAllLocals) {
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


/** 
 * returns list of edges built by fv/bv dependencies in nodes chain 
 *
 *    type Edge = [Node,Node]
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
    for(const i of dst.bv)
      bv.set(i, dst)
  }
  return res
}

/**
 * groups edges into a dependency graph
 */

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

/*
  
  the resulting thing is again 

  type Graph 
     = {type:"seq",  value:Graph[]} 
     | {type:"par",  value:Graph[]} 
     | {type:"leaf", value:Value[]} 

 */

/**
 * returns the resulting graph (type is recursive)
 *
 * Input deps graph saying computation in `src` uses `dst`s (no trans clos)
 * 
 *    graph: {
 *      src: LetVal,
 *      dst: LetVal[]
 *    }
 *
 *  Each node specifies threads join 
 *
 *    type TokOp = Value & {parOp: Token[]}
 * 
 *    type Thread = {
 *      // unique thread's id
 *      id: number,
 *      // thread's rank in dependencies DAG
 *      rank: number,
 *      // threads to join (parallel if more than 1)
 *      // nothing on left means the thread starts with the function
 *      left: Graph[],
 *      // sequence of ops to run after the join
 *      // i.e. the ops running in the thread
 *      right: LetVal[],
 *      frames: FrameDescr[] 
 *      // shared object describing `fork` operation for this thread
 *      fork: ForkVal,
 *      // indicates it is a first thread in fork's tuple
 *      // its first frame actually contains the fork
 *      startThread: boolean,
 *      // the threads's reference counter
 *      rc: number,  
 *      // first: FrameVal, === frames[0].exit
 *      reff: boolean        // right is effectful
 *      // nodes available after this node is computed
 *      // so the node itself and the ones it depends on
 *      scope: Set<LetVal>,
 *      // last frame for this thread (usually contains `join` in its exit)
 *      lastFrame: FrameDescr
 *    }
 * 
 *    type FrameDescr = {
 *      // false if the frame is already in the input
 *      // i.e. a frame with a fork
 *      // exit from the frame, 
 *      // we can parallelize only single exits frame
 *      // so it should be one
 *      exit: LetVal,      
 *      frame: FrameVal,
 *      // content if it is a new frame or `false`
 *      toks: TokOp[] | false      
 *    }
 * 
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
 *        tailFork: ForkVal | null,
 *        // last frame
 *        tailFrame: FrameVal,
 *        value: Thread
 *      })
 *
 *  if letStmt can be parallelized:
 * 
 *   type LetVal = LetVal & {
 *     parFork?: ForkVal
 *   }
 *
 *   type RootVal = RootVal & {
 *     commonJoin: FrameValue, // a common frame with a sole join operation 
 *     commonJoinToks: TokOp[],
 *     parDefs: Thread[][]
 *   }
 *
 *   type FrameVal = FrameVal & {
 *     // the frame was replaced with parallel frames
 *     parErase: boolean;
 *     // jump to this frame is to be substituted with another address
 *     parSubst: boolean;
 *   }
 */
function deriveBlocks(graph, s, root) {
  const nodes = []
  let store = [] // Node[]
  let id = 0
  const {errFrameRedir,resFrameRedir,resFrame} = root
  /** first letStmt stays in same frame, other frames are rebuilt */
  const first = graph[0][0]
  const exitGoto = graph[graph.length-1][0].goto
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
    store.push(cur)
  }
  /**
   * pre-calculating thread reference counts and if it has effectful parts,
   * the pure only threads aren't interesting they are merged with corresp.
   * effectful ones in next stage
   */
  for(const i of store) {
    for(const j of i.left)
      ++j.rc
    let reff = false
    for(const j of i.right) {
      if (j.eff) {
        reff = true
        break
      } 
    }
    i.reff = reff
  }
  /**
   * ## Reducing the graph
   *
   * merging serialized threads (running sequentially anyway)
   */
  for(const i of store) {
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
  store = store.filter(i => !i.removed)
  /**
   * merging serialized threads (running sequentially anyway)
   */
  for(const i of store) {
    if (i.left.length === 1) {
      const [l] = i.left
      if (l.rc === 1) {
        l.remove = true
        i.right.unshift(...l.right)
        i.left = l.left
      }
    }
  }
  store = store.filter(i => !i.remove)

  /**
   * nothing to run in parallel here (giving up)
   */
  if (store.length === 1)
    return

  /** 
   * ## calculating fork points 
   *
   * Several nodes can start running together if they have
   * same dependency list (`left`). Calculating shared `fork` 
   * objects for them.
   */
  const forks = new Map()
  for(const i of store) {
    const lid = i.left.map(i => i.id).join()
    let fork = forks.get(lid)
    if (!fork)
      forks.set(lid,fork = {tuple:[], left:i.left})
    i.fork = fork
    fork.tuple.push(i)
  }
  /**
   * Splitting threads back into frames
   */
  for(const i of store) {
    let toks = []
    let lastExit
    const frames = i.frames = []
    for(const j of i.right) {
      if (j == first) {
        lastExit = j
        frames.push({toks:false,exit:j,frame:j.ref})
        continue
      }
      toks.push(j)
      if (j.eff) {
        lastExit = j
        const declSym = Kit.scope.newSym("_")
        const frame = s.tok(Tag.push, Block.frame,
                            {declSym,savedDecls:emptyMap,parSubst:true,
                             resFrameRedir,errFrameRedir}).value
        frames.push({toks,exit:j,frame})
        toks = []
      }
    }
    const last = {toks}
    frames.push(last)
    /**  
     * if there are some not-eff toks left or it binds some var
     * we are to add another frame with the pure code and join
     */
    if (toks.length || (lastExit && lastExit.sym && lastExit.sym.bound)) {
      const declSym = Kit.scope.newSym("_")
      const frame = s.tok(Tag.push, Block.frame,
                          {declSym,savedDecls:emptyMap,parSubst:true,
                           resFrameRedir,catchContRedir:errFrameRedir}).value
      const join = s.tok(Tag.push,Ctrl.jump,
                         {eff:true,goto:root.pureExitFrame,
                          gotoDests:[root.pureExitFrame],
                          ref:frame,insideCtx:true,last:true})
      toks.push({parOp:[join]})
      last.exit = join.value
      last.frame = frame
      if (lastExit)
        lastExit.gotoDests = [lastExit.goto = frame]
      if (errFrameRedir)
        errFrameRedir.required = true
      if (resFrameRedir)
        resFrameRedir.required = true
      i.lastFrame = last
    } else {
      last.toks = false
      last.exit = false
      last.frame = root.pureExitFrame
      i.lastFrame = frames[frames.length-2]
    }
  }
  /**
   * Generating frame's boundaries and calculating parameters
   * it require (patSym, declSym etc)
   */
  for(const i of store) {
    i.startThread = false
    const fs = i.frames
    for(const j of fs) {
      const f = j.frame
      if (j.toks) {
        for(const k of j.toks) {
          if (k.ref) {
            k.ref.parErase = true
            k.ref = f
          }
        }
      }
    }
    for(let j = 0, len = fs.length - 1; j < len; ++j) {
      const cur = fs[j]
      const next = fs[j+1]
      cur.exit.gotoDests = [cur.exit.goto = next.frame]
      next.frame.patSym = cur.exit.sym
    }
    i.rank = Math.max(0,...i.left.map(i => i.rank)) + 1
  }
  const forksArr = [...forks.values()]
  for(const i of forksArr)
    i.rank = Math.max(...i.tuple.map(i => i.rank))
  const maxRank = Math.max(...forksArr.map(i => i.rank))
  for(const i of forksArr)
    liftForkExprs(i)
  for(const fork of forksArr)
    fork.enter = fork.tuple[0].frames[0].exit
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
        i.joinFrame = i.joinFork ? i.joinFork.enter.ref : root.pureExitFrame
      } else {
        i.tailFork = null
        i.tailFrame = i.value.lastFrame
      }
    }
    if (tup.size === 1) {
      [fork.rootExpr] = tup
    } else
      fork.rootExpr = {fork:true,rc:0,tup,joinFork:null,joinFrame:resFrameRedir}
  }
  forksArr[0].rootExpr.joinFrame = exitGoto
  for(const i of forksArr)
    i.rootExpr = optForkExpr(i.rootExpr)
  /** marking letStmt to substitude forks */
  for(const i of forksArr) {
    if (i.rootExpr && i.enter)
      i.enter.parFork = i
    i.tuple[0].startThread = true
  }
  root.parDefs.push(store)
  /**
   * gets all possible graph splittings calculating `dests`
   */
  function getOpts(dests/*:LetVal[]*/)/*: Thread[][] */ {
    const len = store.length
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
      const f = store[pos]
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
    if (!expr.fork)
      return expr
    if (expr.opt)
      return expr.opt
    if (expr.tup.size === 1) {
      const [child] = expr.tup
      if (child.rc < 2) {
        const next = optForkExpr(child)
        // TODO:
        setTail(next,expr.joinFrame,expr.joinFork)
        return expr.opt = next
      }
    }
    return expr.opt = {fork:true,tup:[...expr.tup].map(optForkExpr),
                       joinFrame:expr.joinFrame, joinFork:expr.joinFork}
  }
  function setTail(expr, frame, fork) {
    if (expr.fork) {
      if (expr.joinFork) {
        setTail(expr.joinFork.rootExpr, frame, fork)
      } else {
        expr.joinFork = fork
        expr.joinFrame = frame
      }
    } else {
      if (expr.tailFork) {
        setTail(expr.tailFork.rootExpr, frame, fork)
      } else {
        expr.value.lastFrame.exit.goto = frame
        expr.tailFork = fork
        expr.tailFrame = frame
      }
    }
  }
}

/** 
 * calculates DAG and stores it into root
 *
 *   type DAG = [Node]
 *   type Node 
 *      // sequentialy running frames from `value`
 *      = { type: "leaf", value: FrameVal[] }
 *      // parallel sub-graphs 
 *      | { type: "fork", value: Node[] }
 *      // sequential sub-graphs
 *      | { type: "seq": value: Node[] }  
 */
export function prepare(sa) {
  const s = Kit.auto(sa/*deb_("pre-pa",sa)*/)
  const root = s.first.value
  const denyClone = root.opts.denyClone !== false
  const chains = []
  const inits = new Set()
  if (!root.opts.scopePrefix)
    throw new Error("`par` requires `scopePrefix:true`")
  if (s.opts.cleanupFrameVars)
    throw new Error("NOT IMPLEMENTED: `par` with `cleanupFrameVars:true`")
  const [initJump] = root.first.exits
  // calcVars(sa)
  start(initJump)
  const nodes = getNodes(chains,sa)
  root.parDefs = []
  nodes.map(solve)
  // root.par = {chains:chains.map(rearrange)}
  return sa
  function solve(nodes) {
    nodes.forEach(nodeVars)
    const edges = edgesByVars(nodes)
    const graph = buildGraph(nodes, edges)
    deriveBlocks(graph, s, root)
  }
  function start(from) {
    // skipping to first effectful jump
    if (inits.has(from))
      return
    inits.add(from)
    const seen = new Set()
    const value = []
    for(let cur = from;;[cur] = cur.goto.exits) {
      if (seen.has(cur))
        break
      seen.add(cur)
      if (cur.gotoDests.length > 1) {
        for(const i of cur.gotoDests)
          i.exits.forEach(start)
        break
      }
      const {goto} = cur
      if (!goto)
        break
      if (denyClone && goto.enters.size !== 1) {
        goto.exits.forEach(start)
        break
      }
      const exitsNum = goto.exits.size
      if (exitsNum > 1
         || cur.ref.catchContRedir !== goto.catchContRedir
         || cur.ref.resultContRedir !== goto.resultContRedir) {
        goto.exits.forEach(start)
        break
      } else
        if (cur.bindName === "chain")
          value.push(cur)
      if (exitsNum !== 1)
          break
    }
    if (value.length)
      chains.push(value)
  }
}

const forkSym = Kit.sysId("fork")

const emptyMap = new Map()

function* substFrames(si) {
  const s = Kit.auto(si)
  const root = s.first.value
  yield* s.find(i => i.type === Block.frame)
  for(const i of s.sub()) {
    if (i.enter && i.type === Block.frame && i.value.parErase)
      Kit.skip(s.copy(i))
    else
      yield i
  }
  for(const store of root.parDefs) {
    for(const j of store) {
      for(const k of j.frames) {
        if (k.toks) {
          yield s.enter(Tag.push, Block.frame, k.frame)
          for(const l of k.toks)
            yield* l.parOp
          yield* s.leave()
        }
      }
    }
  }
  yield* s
}

/** 
 * interprets `parFork` field of `letStmt` to substitute corresponding tokens
 */
function* substJumps(si) {
  const s = Kit.auto(si)
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
  
  for(const i of s) {
    if (i.enter) {
      switch(i.type) {
      case Block.letStmt:
        if (!i.value.eff)
          break
        if (!i.value.parFork || !i.value.parFork.rootExpr.fork)
          break
        const frame = i.value.ref
        for(const expr of flattenExpr(frame, i.value.parFork.rootExpr)) {
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
              ref:frame,gotoDests:[expr.joinFrame],tmpVar})
            yield s.enter(Tag.push,Block.app,{
              result:false,sym:forkId})
            yield s.enter(Tag.push,Tag.ArrayExpression)
            yield s.enter(Tag.elements,Tag.Array)
            for(const i of expr.tup)
              yield s.tok(Tag.push,Tag.Identifier,{sym:i.tmpVar})
          } else {
            const v = expr.value
            if (v.startThread) {
              yield s.enter(Tag.push,Block.letStmt,{
                eff:true,ref:frame,
                goto:i.value.goto,gotoDests:[i.value.goto],
                reflected,tmpVar})
              yield* s.sub()
              yield* s.leave()
            } else {
              const next = v.frames[0].frame
              yield s.tok(Tag.push,Ctrl.jump,{
                ref:frame,goto:next,gotoDests:[next],reflected,tmpVar})
            }
          }
          yield* lab()
        }
        Kit.skip(s.copy(i))
        continue
      }
    }
    yield i
  }
}

export function interpret(si) {
  const sa = Kit.toArray(si)
  const s = Kit.auto(sa)
  const root = s.first.value
  if (!root.opts.par)
    return sa
  prepare(sa)
  if (!root.parDefs || !root.parDefs.length)
    return s
  return substJumps(substFrames(s))
}

function byId(a,b) { return a.id - b.id }
