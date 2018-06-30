/** 
 * implicit parallelization, detecting Applicative combinators 
 */
import * as Kit from "./kit"
import {Tag} from "./kit"
import * as Block from "./block"
import * as Bind from "./bind"

/**
 * for each frame calculates bind variables bound there or used there
 * (this doesn't include local variables)
 */
function calcFreeBoundVars(sa) {
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
export function prepare(root, frames, sa) {
  if (!root.opts.par)
    return
  const denyClone = root.opts.denyClone !== false
  // binds information is already in vars dependency
  let getBV, getFV
  switch(root.opts.parVars) {
  case "none":
    getBV = bvNoLocals, getFV = fvNoLocals
    calcFreeBoundVars(sa)
    break
  case "all":
    getBV = localsAll, getFV = localsAll
    break
  default:
    getBV = fvLocalsFlow, getFV = fvLocalsFlow
    break
  }
  const chains = []
  const inits = new Set()
  if (!root.opts.scopePrefix)
    throw new Error("`par` requires `scopePrefix:true`")
  const [initJump] = root.first.exits
  start(initJump)
  root.par = {chains:chains.map(rearrange)}
  return sa
  function bvNoLocals(f) { return f.ref.bv }
  function fvNoLocals(f) { return f.ref.fv }
  function* localsAll(f) { yield* f.ref.stateVars.w; yield* f.ref.stateVars.r }
  function bvLocalsFlow(f) { return f.ref.stateVars.w }
  function fvLocalsFlow(f) { return f.ref.stateVars.r }
  
  function segments(seq) {
    const curBv = new Set()
    const chain = seq.value
    const first = chain[0]
    if (first.sym)
      curBv.add(first.sym)
    const len = chain.length
    let cur = [first]
    const res = [{value:cur,type:"leaf"}]
    for(let i = 1; i < len; ++i) {
      const f = chain[i]
      const par = check(i,len)
      for(const j of getBV(f))
        curBv.add(j)
      if (par) {
        cur = [f]
        res.push({value:cur,type:"leaf"})
      } else {
        cur.push(f)
      }
    }
    return res
    function check(i) {
      for(let j = i; j < len; ++j) {
        for(const k of getFV(chain[j])) {
          if (curBv.has(k))
            return false
        }
      }
      return true
    }
  }
  function rearrange(seq) {
    if (!seq.value.length)
      return seq
    const pars = segments(seq)
    return pars && pars.length > 1 ? {value:pars.map(split),type:"fork"} : split(seq)
  }
  function cost(node) {
    switch(node.type) {
    case "fork":
      return Math.max(...node.value.map(cost))
    case "seq":
      return node.value.map(cost).reduce((a,b) => a+b, 0)
    default:
      return node.value.length
    }
  }
  function split(seq) {
    const chain = seq.value
    const len = chain.length
    if (len === 1)
      return seq
    let minCost = len + 1, curMin = seq
    for (let i = 1; i < len; ++i) {
      const cur = splitAt(i)
      if (!cur)
        continue
      const c = cost(cur)
      if (c < minCost) {
        minCost = c
        curMin = cur
      }
    }
    return curMin
    function splitAt(i) {
      return {value:[rearrange({value:chain.slice(0,i),type:"leaf"}),
                     rearrange({value:chain.slice(i),type:"leaf"})],
              type: "seq"}
    }
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
    if (value.length) {
      chains.push({value,type:"leaf"})
    }
  }
}

const forkSym = Kit.sysId("fork")
const joinSym = Kit.sysId("join")
const libSymGoto = {declSym:joinSym,lib:true}

const emptyMap = new Map()

export function interpret(si) {
  const s = Kit.auto(si)
  const root = s.first.value
  if (!root.par || !root.par.chains.length)
    return s
  const joinFrameMemo = new Map()
  const joinFrameBuf = []
  const leafs = []
  const forks = []
  const seqs = []
  calc(root.par.chains)
  for(const i of seqs)
    i.value[i.value.length-1].exit = i.exit
  for(const i of leafs)
    i.last.goto = i.exit
  for(const i of forks) {
    for(const j of i.value)
      j.first.parFork = null
    i.first.parFork = i
  }
  return _interpret(si)
  function calc(node) {
    for(const i of node) {
      switch(i.type) {
      case "fork":
        calc(i.value)
        forks.push(i)
        i.first = i.value[0].first
        i.last = i.value[i.value.length-1].last
        for(const j of i.value) {
          const dest = j.exit
          const pat = dest.patSym
          j.exit = getJoinFrame(pat || null)
          dest.patSym = null
        }
        break
      case "seq":
        seqs.push(i)
        calc(i.value)
        i.first = i.value[0].first
        i.last = i.value[i.value.length-1].last
        break
      case "leaf":
        leafs.push(i)
        i.first = i.value[0]
        i.last =i.value[i.value.length-1]
        break
      }
      i.exit = i.last.goto
    }
  }
  function getJoinFrame(patSym) {
    let res = joinFrameMemo.get(patSym)
    if (res == null) {
      const frame = [...joinFrame(patSym)]
      joinFrameBuf.push(frame)
      joinFrameMemo.set(patSym, res = frame[0].value)
    }
    return res
  }
  function* joinFrame(patSym) {
    const lab = s.label()
    const declSym = Kit.scope.newSym("join")
    const start = s.enter(Tag.push, Block.frame,
                          {declSym,patSym,
                           savedDecls:emptyMap})
    if (patSym && !patSym.extBind) {
      Bind.setSymInterpr(patSym)
      patSym.extBind = true
      root.savedDecls.set(patSym,{})
      if (patSym.boundAt) {
        patSym.boundAt.savedDecls.delete(patSym)
        patSym.boundAt = null
      }
    }
    yield start
    yield s.tok(Tag.push,Block.app,
                {sym:joinSym,insideCtx:true,last:true})
    yield* lab()
  }
  function buildForks(jump, fork) {
    const frame = jump.ref
    return _buildForks(fork, true)
    function* _buildForks(fork) { 
      const sym = Kit.scope.newSym("f")
      frame.savedDecls.set(sym,{raw:null})
      yield* s.toks(Tag.push,`=$I = $I()`,sym,forkSym)
      const threads = [...fork.value]
      if (s.curLev()) {
        yield* s.template(Tag.push,`=$I.fchain($E, $I)`,sym,jump.goto.declSym)
        yield* Kit.reposOne(s.one(),Tag.push)
        yield* s.leave()
        threads.shift()
      }
      for(const i of threads) {
        switch(i.type) {
        case "leaf":
          yield* s.toks(Tag.push,`=$I.fjump($I)`,sym,i.value[0].ref.declSym)
          break
        case "seq":
          const head = i.value[0]
          switch(head.type) {
          case "fork":
            const sub = yield* _buildForks(head)
            head.done = true
            yield* s.toks(Tag.push,`=$I.fchain($I,$I)`,sym,sub,head.exit.declSym)
            break
          case "leaf":
            yield* s.toks(Tag.push,`=$I.fjump($I)`,sym,head.value[0].ref.declSym)
            break
          default:
            throw s.error(`INTERNAL: unsupported sequence head ${head.type}`)
          }
          break
        default:
          throw s.error(`INTERNAL: unsupported fork branch ${i.type}`)
        }
      }
      return sym
    }
  }
  function* _interpret() {
    yield* s.find(i => i.type === Block.frame)
    for(const i of s.sub()) {
      yield i
      if (i.enter && i.type === Block.letStmt
          && i.value.eff && i.value.parFork) {
        const lab = s.label()
        yield s.enter(Tag.push, Tag.SequenceExpression)
        yield s.enter(Tag.expressions,Tag.Array)
        const sym = yield* buildForks(i.value,i.value.parFork)
        i.value.goto = i.value.parFork.exit
        yield s.tok(Tag.push,Tag.Identifier,{sym})
        if (!i.leave)
          yield* s.sub()
        yield* lab()
      }
    }
    for(const i of joinFrameBuf)
      yield* i
    yield* s
  }
}
