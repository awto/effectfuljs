import * as R from "ramda"
import * as Kit from "./kit"
import {Tag,produce,consume,symbol,scope} from "estransducers"
import * as T from "babel-types"
import * as assert from "assert"
const {enter,leave,tok} = Kit
import * as Block from "./block"
import * as Branch from "./branch"
import * as Loop  from "./loops"
import * as Ctrl  from "./control"
import * as Debug from "./debug"
import * as Uniq from "./uniq"
import * as trace from "estransducers/trace"

export const writeState = symbol("writeState")
export const readState = symbol("readState")

/** 
 * moves all variable declarations in decls field of a root Val
 *
 *      type Val = Val & { decls: Token[] }
 */
export const saveDecls = R.pipe(
  function* saveDecls(s) {
    const sl = Kit.auto(s)
    const top = sl.peel()
    const decls = top.value.decls = {}
    const rawDecls = decls.raw = []
    const varDecls = decls.vars = []
    function* walk() {
      for(const i of sl.sub()) {
        if (i.enter) {
          switch(i.type) {
          case Tag.ClassDeclaration:
          case Tag.FunctionDeclaration:
            rawDecls.push(...sl.copy(Kit.setPos(i,Tag.push)))
            continue
          case Tag.VariableDeclaration:
            i.value.node.kind = "var"
            const declarators = []
            const stmt = i.pos !== Tag.init && i.pos !== Tag.left
            sl.peel(i)
            sl.peel()
            for(const j of sl.sub()) {
              assert.ok(j.enter)
              assert.equal(j.type,Tag.VariableDeclarator)
              sl.peel(j)
              let hasInit = false, id = null
              const asgn = []
              for(const k of sl.sub()) {
                if (k.enter) {
                  switch(k.pos) {
                  case Tag.init:
                    hasInit = true
                    asgn.push(sl.peel(Kit.setPos(k,Tag.right)),
                              ...sl.sub(),
                              ...sl.leave())
                    break
                  case Tag.id:
                    id = [...sl.copy(k)]
                    asgn.push(...id)
                    varDecls.push(
                      ...id
                        .filter(i => i.enter
                                && i.type === Tag.Identifier
                                && i.value.decl)
                        .map(i => i.value))
                    break
                  }
                }
              }
              if (hasInit) {
                id[0].pos = id[id.length-1].pos = Tag.left
                declarators.push(asgn)
              } else {
                if (i.pos === Tag.left) {
                  id[0].pos = id[id.length-1].pos = i.pos
                  yield* id
                } else
                  yield sl.tok(i.pos,Tag.Null)
              }
              Kit.skip(sl.leave())
            }
            if (declarators.length) {
              if (stmt && i.pos === Tag.push) {
                for(const k of declarators) {
                  yield sl.enter(Tag.push,Tag.ExpressionStatement)
                  yield sl.enter(Tag.expression,
                                 Tag.AssignmentExpression,
                                 {node:{operator:"="}})
                  yield* k
                  yield* sl.leave()
                  yield* sl.leave()
                }
              } else {
                const lab = sl.label()
                if (stmt)
                  yield sl.enter(i.pos,Tag.ExpressionStatement)
                let pos = stmt ? Tag.expression : i.pos
                if (declarators.length !== 1) {
                  yield sl.enter(pos,Tag.SequenceExpression)
                  yield sl.enter(Tag.expressions,Tag.Array)
                  pos = Tag.push
                }
                for(const k of declarators) {
                  yield sl.enter(pos,
                                 Tag.AssignmentExpression,
                                 {node:{operator:"="}})
                  yield* k
                  yield* sl.leave()
                }
                yield* lab()
              }
            }
            Kit.skip(sl.leave())
            Kit.skip(sl.leave())
            continue
          }
        }
        yield i
      }
    }
    if (!top.value.topEff) {
      yield* sl.copy(top)
      return
    }
    yield top
    yield* walk()
    yield* sl.leave()
  },Kit.removeNulls,Array.from)

/** restores declaration removed `saveDecls` in the beginning of root's body */
export function* restoreDecls(s) {
  const sl = Kit.auto(s)
  const top = sl.take()
  yield top
  if (top.value.decls) {
    for(const i of sl) {
      yield i
      if (i.enter && i.type === Tag.Array && i.pos === Tag.body) {
        const {raw,vars} = top.value.decls
        // TODO: abstract it from here (take it from scope not from stateVars)
        yield* raw
        if (vars.length) {
          const lab = sl.label()
          yield sl.enter(Tag.push,Tag.VariableDeclaration,{node:{kind:"var"}})
          yield sl.enter(Tag.declarations,Tag.Array)
          for(const i of vars) {
            yield sl.enter(Tag.push,Tag.VariableDeclarator)
            yield sl.tok(Tag.id,i)
            yield* sl.leave()
          }
          yield* lab()
        }
        break
      }
    }
  }
  yield* sl
}

/**
 * for each Identifier:
 *
 *    type Tok = Tok 
 *             | Tok & { type: Identifier, 
 *                       value: { lhs?: boolean, rhs?: boolean } } 
 *
 * only if the variable isn't mentioned in refs and used only in one function
 */
function resetIdOp(si) {
  const sa = Kit.toArray(si)
  const s = Kit.auto(sa)
  for(const i of Kit.resetFieldInfo(s)) {
    if (i.enter && i.type === Tag.Identifier && i.value.sym != null) {
      const si = i.value.sym,
            refs = i.value.opts && i.value.opts.refs
      if (si.declScope != null
          && (si.refScopes == null || si.refScopes.size === 0)
          && (!refs || !refs.has(i.value.sym))) {
        const fi = i.value.fieldInfo
        i.value.lhs = fi.mod
        i.value.rhs = fi.expr
      }
    }
  }
  return sa
}

// removes declarations already tracked by state ops
export function removeTrackedDecls(si) {
  const sa = Kit.toArray(si)
  const tot = new Set()
  // TODO: store before
  for(const i of sa) {
    if (i.enter && i.type === Tag.Identifier && (i.value.lhs || i.value.rhs))
      tot.add(i.value.sym)
  }
  const {decls} = sa[0].value
  decls.vars = decls.vars.filter(i => !tot.has(i.sym))
  return sa
}

/**
 * for each Identifier with lhs or rhs set builds a simple dataflow graph with 
 * nodes stored in Value, `i` is a link to a Val where the variable is set, 
 * and `o` is to there variable was read
 *
 *     type VDFNode = { i: Set<Val>, o: Set<Val> }
 *
 *     type Val = Val & { vdf: VDFNode }
 */
function calcVarsDataflow(si) {
  const sa = Kit.toArray(si)
  const s = Kit.auto(Branch.mark(sa))
  const loopids = []
  function walk(par,brLoc,looph) {
    const loc = new Map()
    for(const i of s.sub()) {
      if (i.enter) {
        switch(i.type) {
        case Branch.fork:
          const br = [...par,...loc]
          const tsloc = []
          const bloc = walk(new Map(br),tsloc,looph)
          for(const [sym,j] of bloc)
            loc.set(sym,j)
          const syms = new Set([].concat(...tsloc.map(i => [...i.keys()])))
          for(const i of syms) {
            const nxt = tsloc.map(j => j.get(i)).filter(i => i != undefined)
            if (nxt.length < tsloc.length) {
              const t = loc.get(i)
              if (t != null)
                nxt.push(t)
            }
            loc.set(i,[].concat(...nxt))
          }
          break
        case Branch.thread:
          brLoc.push(walk(par,new Map(),looph))
          break
        case Tag.Identifier:
          const {sym} = i.value
          if (sym != null) {
            const vdf = i.value.vdf = {i:new Set(), o: new Set()}
            if (i.value.rhs) {
              const wv = loc.get(sym) || par.get(sym)
              if (wv != null) {
                for(const j of wv) {
                  j.vdf.o.add(i.value)
                  vdf.i.add(j)
                }
              }
            }
            if (i.value.lhs) {
              loc.set(i.value.sym,[i.value])
            }
            
          }
          break
        }
      }
    }
    return loc
  }
  walk(new Map(),null)
  return setLoopBackwardLink(sa)
}

function setLoopHier(si) {
  const sa = Kit.toArray(si)
  const s = Kit.auto(calcFrameHierPath(sa))
  function walk(cur) {
    for(const i of s.sub()) {
      if (i.enter) {
        switch(i.type) {
        case Loop.repeat:
          walk(i.value.hierpath)
          break
        case Tag.Identifier:
          if (i.value.sym != null && (i.value.lhs || i.value.rhs)) {
            i.value.loophier = cur
          }
          break
        }
      }
    }
  }
  walk([])
  return sa
}

/** 
 * for last writes inside `repeat` adds destination to its first reads 
 * in a data flow graph 
 */
function setLoopBackwardLink(si) {
  const sa = Kit.toArray(si)
  const s = Kit.auto(setLoopHier(sa))
  function walk(stack) {
    for(const i of s.sub()) {
      switch(i.type) {
      case Loop.repeat:
        if (i.enter)
          stack.push({p: i.value.hierpath,
                      vs: new Map(),
                      syms: i.value.cycleDeps = new Set()})
        if (i.leave)
          stack.pop()
        break
      case Tag.Identifier:
        if (i.enter) {
          if (i.value.sym != null) {
            if (i.value.rhs) {
              const edges = new Set(i.value.vdf.i)
              if (edges.size) {
                for(let j = stack.length-1; j >= 0; j--) {
                  const {p,vs} = stack[j]
                  for(const k of edges) {
                    if (p > k.loophier) {
                      let l = vs.get(i.value.sym)
                      if (l == null)
                        vs.set(i.value.sym,l = [])
                      l.push(i.value)
                      break
                    }
                    edges.delete(k)
                  }
                  if (!edges.size)
                    break
                }
              } else {
                // if the variable is read before it's written
                // (e.g. in next iteration)
                const {vs} = stack[stack.length-1] 
                let l = vs.get(i.value.sym)
                if (l == null)
                  vs.set(i.value.sym,l = [])
                l.push(i.value)
              }
            }
            if (i.value.lhs) {
              for(let j = stack.length-1; j >= 0; j--) {
                const {vs,syms} = stack[j]
                const r = vs.get(i.value.sym)
                if (r != null && r.length) {
                  syms.add(i.value.sym)
                  for(const k of r) {
                    k.vdf.i.add(i.value)
                    i.value.vdf.o.add(k)
                  }
                }
              }
            }
          }
        }
        break
      }
    }
  }
  for(const i of s) {
    if (i.enter && i.type === Loop.repeat) {
      walk([{p:i.value.hierpath,
             vs:new Map(),
             syms:i.value.cycleDeps = new Set()}])
    }
  }
  return sa
}
/*

TODO: this test

function z() {
  for(;;) {
    r.i
    for(;;) {
      w.k
      for(;;) {
        r.k
        r.j
      }
      for(;;) {
        w.i, w.j, w.k
      }
    }
  }
}
*/

/** hierpath poset horizontal less equal operator */
function hLE(p,c) {
  const pl = p.length, cl = c.length
  if (pl >= cl)
    return false
  for(let i = 0; i < pl; ++i)
    if (p[i] !== c[i])
      return false
  return true
}

/** hierpath poset vertical less equal operator */
function vLE(a, b) {
  const al = a.length, bl = b.length, l = Math.min(al,bl)
  for(let i = 0; i < l; i++) {
    const av = a[i]
    const bv = b[i]
    if (av < 0) {
      if (av === bv)
        continue
      assert.ok(bv < 0)
      return false
    }
    if (av < bv)
      return true
    if (av > bv)
      return false
  }
  return al <= bl
}

/** 
 * forall elem: hierpath, bounds: Ordered<hierpath>
 *     . [ x | x `memb` bounds, x v< elem ]
 */
function before(elem, set) {
  const res = []
  for(let i = 0, len = set.length; i < len; i++) {
    const b = set[i]
    if (b === elem)
      break
    if (vLE(b,elem))
      res.push(b)
  }
  return res
}

/** 
 * lookups a path in `all` before `elem` but after closest `bounds`  
 *   
 *    (elem: hierpath, bounds: Set<hierpath>, all: Ordered<hierpath>) =>
 *       min({x | x `mem` all, x < elem, forall y `mem` bounds . x < y })
 *        
 */
function* between(elem,bounds,all) {
  const as = before(elem,all), al = as.length
  const bs = before(elem,bounds), bl = bs.length
  const res = []
  up: for(let i = 0; i < al; i++) {
    const a = as[i]
    for(let j = bl-1; j >=0; j--) {
      const b = bs[j]
      if (!vLE(b,a) /* && a !== b */)
        continue up
    }
    yield a
  }
}

/** 
 * for each `frame` calculates its hierarchy position representation 
 * as array of numbers 
 *
 *     type Tok = Tok
 *              | Tok & { type: frame | chain | repeat,
 *                        value: { hierpath: number[] } }
 *
 * TODO: move to some compact encoding (maybe)
 * 
 * hierpath forms two posets (join-semilattices), say, horizontal and vertical,
 *   - a h< b if a is ancestor of b
 *   - a v< b if a goes before b, it is not a total order 
 *            because elements in parallel branches aren't comparable
 */
export function calcFrameHierPath(si) {
  const sa = Kit.toArray(si)
  const s = Kit.auto(Branch.mark(sa))
  function walk(par) {
    let x = 0
    for(const i of s.sub()) {
      if (i.enter) {
        switch(i.type) {
        case Block.chain:
        case Branch.fork:
        case Block.frame:
        case Loop.repeat:
          i.value.hierpath = par && par.hierpath.concat([x++]) || []
          walk(i.value)
          break
        case Branch.thread:
          i.value.hierpath = par && par.hierpath.concat([-1-(x++)]) || []
          walk(i.value)
          break
        }
      }
    }
  }
  walk()
  return sa
}

/**
 * collects state variables accessed or changed in frame to stateVars, 
 * and extends each variable with a link to its parent frame:
 *
 *    type StateVars = { r: Map<Sym,Val[]>, w: Map<Sym,Val[]> }
 *    type Tok = Tok 
 *             | Tok & { type: Tag.Identifier, value: { parFrame: Val } }
 *             | Tok & { type: Block.frame, value: { stateVars: StateVars } } }
 */
export function calcFrameStateVars(si) {
  const sa = Kit.toArray(si)
  const s = Kit.auto(sa)
  let buf = []
  function walk(par,sw) {
    for(const i of s.sub()) {
      if (i.enter) {
        switch(i.type) { // TODO: fork must be hanled as par
        case Block.frame:
          if (buf !== null) {
            for(const j of buf)
              j.parFrame = i.value
            i.value.rootFrame = true
            buf = null
          }
          i.value.stateVars = {r:new Map(),w:new Map()}
          const f = i.value.initFrame || i.value
          walk(i.value,f.stateVars)
          break
        case Tag.Identifier:
          if (sw != null && i.value.sym != null) {
            if (i.value.lhs) {
              let k = sw.w.get(i.value.sym)
              if (k == null)
                sw.w.set(i.value.sym,k = [])
              k.push(i.value)
            }
            if (i.value.rhs) {
              let k = sw.r.get(i.value.sym)
              if (k == null)
                sw.r.set(i.value.sym,k = [])
              k.push(i.value)
            }
          }
          // TODO: init parFrame for params insted
          if (par == null) {
            buf.push(i.value)
          } else
            i.value.parFrame = par.initFrame || par
          break
        }
      }
    }
  }
  walk(null)
  return sa 
}

/**
 * calculates variables to copy in each state write
 *
 *   type Tok = Tok 
 *            | Tok & { type: letStmt, eff: true, value: { copy: Set<Sym> } }
 */
function calcStateCopies(si) {
  const sa = Kit.toArray(si)
  const s = Kit.auto(sa)
  const c = new Map()
  function walk() {
    for(const i of s.sub()) {
      if (i.enter) {
        switch(i.type) {
        case Block.frame:
          c.delete(i.value)
          if (i.value.save && i.value.save.size) {
            const copy = i.value.copy = new Set([].concat(...c.values()))
            i.value.save.forEach(copy.delete,copy)
          }
          break
          /*
        case Loop.repeat:
          if (i.value.cycleDeps) {
            c.set(i.value,[...i.value.cycleDeps])
            walk()
            c.delete(i.value)
          }
          break
          */
        case Tag.Identifier:
          if (i.value.sym != null && i.value.lhs && i.value.parFrame != null) {
            for(const j of i.value.vdf.o) {
              if (i.value.parFrame !== j.parFrame) {
                let syms = c.get(j.parFrame)
                if (syms == null)
                  c.set(j.parFrame, syms = [])
                syms.push(j.sym)
              }
            }
          }
          break
        case Block.letStmt:
          if (i.value.write && i.value.write.size) {
            const copy = i.value.copy = new Set([].concat(...c.values()))
            i.value.write.forEach(copy.delete,copy)
          }
          break
        }
      }
    }
  }
  walk()
  return sa 
}

/**
 * moves `stateVars.w` from each frame into next effectful 
 * `letStmt` `write` field or to some last not-effectful frame
 *
 *   type Tok = Tok 
 *            | Tok & { type: letStmt, value: { write: Set<Sym> } }
 *            | Tok & { type: frame, value: { save: Set<Sym> } }
 */
export function calcStateWrites(si) {
  const sa = Kit.toArray(si)
  const s = Kit.auto(Branch.mark(sa))
  function walk(cur) {
    for(const i of s.sub()) {
      if (i.enter) {
        switch(i.type) {
        case Branch.fork:
          for(const j of s.sub()) {
            if (j.enter && j.type === Branch.thread) {
              const ncur = new Set(cur)
              walk(ncur)
              assert.equal(ncur.size,0)
            }
          }
          cur.clear()
          break
        case Block.letStmt:
          if (i.value.eff) {
            if (!i.leave)
              walk(cur)
            i.value.write = new Set(cur)
            cur.clear()
          }
          break
        case Loop.repeat:
          walk(new Set())
          break
        case Block.frame:
          if (i.value.stateVars == null)
            break
          const save = new Set()
          up: for(const [sym,j] of i.value.stateVars.w) {
            for(const k of j) {
              for(const l of k.vdf.o) {
                if (l.parFrame !== i.value) {
                  cur.add(sym)
                  continue up
                }
              }
            }
          }
          i.value.stateVars.w.clear()
          walk(cur)
          if (cur.size) {
            assert.ok(!i.value.eff)
            cur.forEach(save.add,save)
            cur.clear()
          }
          if (save.size)
            i.value.save = save
          break
        }
      }
    }
  }
  walk(new Set())
  return sa
}


/**
 * moves variables from `stateVars.r` into read field of each frame
 *
 *    type Tok = Tok | Tok & { type: Block.frame, value: { read: Set<Sym> } }
 */
function calcStateReads(si) {
  const sa = Kit.toArray(calcInitFrame(si))
  // TODO: this considers only 1 frame nesting level, it must work for more
  let x = 0
  for(const i of sa) {
    x++
    if (i.enter && i.type === Block.frame) {
      if (i.value.stateVars != null) {
        const r = i.value.read = new Set()
        const dst = i.value
        up: for(const [s,v] of i.value.stateVars.r) {
          for(const {vdf:k} of v) {
            for(const l of k.i) {
              const src = l.parFrame
              if (src !== dst) {
                r.add(s)
                continue up
              }
            }
          }
        }
        i.value.stateVars.r.clear()
      }
    }
  }
  return sa
}

/**
 * for frames calculates a set of frames with same start
 *
 *    type Tok = Tok 
 *             | Tok & { type: Block.frame, value: { sharedInit: Set<Val> } }
 */
function calcInitFrame(si) {
  const sa = Kit.toArray(si)
  const s = Kit.auto(Branch.mark(sa))
//  let first = true
  function walk(cur) {
    for(const i of s.sub()) {
      if (i.enter) {
        switch(i.type) {
        case Block.frame:
          i.value.initFrame = cur
          /*
          if (first) {
            i.value.rootFrame = true
            first = false
          } */
          walk(cur || i.value)
          cur = null
          break
        case Loop.repeat:
          walk(null)
          break
        case Branch.fork:
          for(const j of s.sub()) {
            if (j.enter && j.type === Branch.thread)
              walk(cur)
          }
          cur = null
        }
      }
    }
  }
  walk(null)
  return sa
}

/**
 * for a variable to be read in the frame if all its writes (1 or 0) are in
 * parents it can avoid state operators and use closure captured value
 * 
 *    type Tok = Tok | Tok & { type: Block.frame, value: { closCopy: Sym[] } }
 */
function calcClosureState(si) {
  const sa = Kit.toArray(calcFrameHierPath(si))
  for(const {sym,srcs,bounds,reads,writes} of collectClosureVarDeps(sa)) {
    const fm = new Map([...srcs].map(i => [i.hierpath,i]))
    const wps = [...bounds].map(i => i.hierpath).sort()
    const all = [...srcs].map(i => i.hierpath).sort()
    const len = all.length
    const dstFrames = new Set()
    const rdFrames = new Set()
    rd: for(const i of reads) {
      const ip = i.hierpath, ipl = ip.length
      for(const cp of between(ip, wps, all)) {
        if (hLE(cp, ip)) {
          dstFrames.add(fm.get(ip))
          continue rd
        }
      }
      rdFrames.add(ip)
    }
    wr: for(const j of writes) {
      const ws = j.stateVars.w.get(sym)
      if (ws != null) {
        // checking if it is easy to delete write
        const closCopy = j.closCopy || (j.closCopy = new Map())
        if (!j.rootFrame && !rdFrames.has(j.hierpath))
          closCopy.set(sym,dstFrames.has(j))
        for(const k of ws) {
          for(const l of k.vdf.o) {
            const pf = l.parFrame
            if (pf !== j && !hLE(j.hierpath,pf.hierpath)
                || l.vdf.i.size > 1)
              continue wr
          }
        }
        j.stateVars.w.delete(sym)
      }
    }
    for(const j of dstFrames) {
      j.stateVars.r.delete(sym)
    }
  }
  return sa
}

/**
 * collects data related to closure analysis into a DepInfo
 * 
 *    type DepInfo = {
 *           sym: Sym,
 *           // there the symbol may be captured from (updated here or read)
 *           srcs: Set<Val & {type: frame}>, 
 *           // there the symbol may be updated (so no closure before this point)
 *           bounds: Set<Val & {type: frame | repeat}>,
 *           // reads frames (to be checked for closure optimization)
 *           reads: Set<Val & {type: frame}>,
 *           // frames there the symbol is update
 *           writes: Set<Val & {type: frame}>
 *           }
 */
function collectClosureVarDeps(sl) {
  const syms = new Map()
  //: Map<Sym,{ r: Set<FrameVal>, w: Set<FrameVal>}>
  for(const i of sl) {
    if (i.enter) {
      switch(i.type) {
      case Tag.Identifier:
        if (i.value.sym != null && i.value.lhs) {
          let t = syms.get(i.value.sym)
          if (t == null)
            syms.set(i.value.sym,t = {sym: i.value.sym,
                                      srcs: new Set(),
                                      bounds: new Set(),
                                      reads: new Set(),
                                      writes: new Set()})
          const pf = i.value.parFrame
          if (pf != null) {
            t.bounds.add(pf)
            t.writes.add(pf)
            t.srcs.add(pf)
            for(const j of i.value.vdf.o) {
              if (j.parFrame !== pf) {
                t.srcs.add(j.parFrame)
                t.reads.add(j.parFrame)
              }
            }
          }
        }
        break
      case Loop.repeat:
        for(const j of i.value.cycleDeps) {
          let t = syms.get(j)
          if (t == null)
            syms.set(i.value.sym,t = {sym:i.value.sym,
                                      srcs: new Set(),
                                      bounds: new Set(),
                                      reads: new Set(),
                                      writes: new Set()})
          t.bounds.add(i.value)
        }
        break
      }
    }
  }
  return syms.values()
}

/**
 * calculates state dependencies amenable to handle with closures, to avoid
 * state operations, and re-arranges frames if possible
 */
export const closureReGroup = R.pipe(
  Block.saveFrameLet,
  calcFrameHierPath,
  calcInitFrame,
  calcFrameStateVars,
  function calcClosOptDeps(s) {
    //TODO: this may be lazy
    const sa = Kit.toArray(s)
    for(const {srcs,bounds,reads} of collectClosureVarDeps(sa)) {
      const fm = new Map([...srcs].map(i => [i.hierpath,i]))
      const wps = [...bounds].map(i => i.hierpath).sort()
      const lets = new Set([...srcs].filter(i => i.effLet != null)
                           .map(i => i.hierpath))
      const all = [...srcs].map(i => i.hierpath).sort()
      const len = all.length
      for(const i of reads) {
        const ip = i.hierpath, ipl = ip.length
        for(const cp of between(ip,wps,all)) {
          const cpl = cp.length - 1
          if (ipl > cpl && hLE(cp.slice(0,cpl),ip)) {
            const il = ip[cpl]
            // may be already ancestor
            if (cp[cpl] === il)
              break
            // if can be shifted
            if (lets.has(cp)) {
              fm.get(cp).fdeps.fwd.add(il)
              break
            }
          }
        }
      }
    }
    return sa
  },
  Block.groupDeps)

/** injects state write operations(`writeState`) where needed */
export function* injectLetWrites(s) {
  const sl = Kit.auto(s)
  function* walk() {
    for(const i of sl.sub()) {
      if (i.enter && i.type === Block.letStmt 
          && i.value.write != null && i.value.write.size) 
      {
        const lab = sl.label()
        yield sl.peel(i)
        yield sl.enter(Tag.push,Block.chain,{kind:"pseq"})
        const w = i.value.write
        const c = i.value.copy || new Set()
        yield tok(Tag.push,writeState,{write:w,copy:c,bind:true})
        yield sl.enter(Tag.push,Block.frame,
                       {info:{hasStmts:false,hasBind:true}})
        yield sl.enter(Tag.push,Block.letStmt,{pat:[]})
        yield* walk()
        yield* lab()
      } else if (i.enter && i.type === Block.frame
            && i.value.save && i.value.save.size)
      {
        yield sl.peel(i)
        let found = false
        const w = i.value.save
        const c = i.value.copy || new Set()
        const r = [
          sl.enter(Tag.push,Block.letStmt,{eff:true,pat:[]}),
          tok(Tag.expression,writeState,{write:w,copy:c,bind:true}),
          ...sl.leave()]
        for(const j of sl.sub()) {
          if (j.enter && j.type === Tag.ReturnStatement) {
            assert.equal(j.pos,Tag.push)
            assert.ok(j.value.last)
            const lab = sl.label()
            yield sl.enter(Tag.push,Tag.VariableDeclaration,
                           {node:{kind:"let"}})
            yield sl.enter(Tag.declarations, Tag.Array)
            yield sl.enter(Tag.push,Tag.VariableDeclarator)
            const sym = scope.newSym()
            yield sl.tok(Tag.id,Tag.Identifier,{sym})
            if (sl.curLev() != null) {
              const j = sl.take()
              yield sl.peel(Kit.setPos(j,Tag.init))
              yield* sl.sub()
            }
            yield* lab()
            yield sl.enter(Tag.push,Block.chain)
            yield sl.enter(Tag.push,Block.frame)
            yield* r
            r.length = 0
            yield* sl.leave()
            yield sl.enter(Tag.push,Block.frame)
            yield sl.peel(j)
            yield sl.enter(Tag.argument,Tag.Identifier,{sym})
            yield* lab()
          } else
            yield j
        }
        yield* r
        yield* sl.leave()
      } else
        yield i
    }
  }
  yield* walk()
}

/** injects state read operations(`readState`) where needed */
export function* injectFrameReads(s) {
  const sl = Kit.auto(s)
  function* pat(i,r) {
    if (r != null && r.size) {
      yield sl.enter(Tag.push,Tag.ObjectPattern)
      yield sl.enter(Tag.properties,Tag.Array)
      for(const i of r) {
        yield sl.enter(Tag.push,Tag.ObjectProperty,
                       {node:{computed:false,shorthand:true}})
        // sym decl is duplicated, this may make scope mad
        yield sl.tok(Tag.key,Tag.Identifier,{node:{name:i.name}})
        yield sl.tok(Tag.value,Tag.Identifier,{decl:true,sym:i})
        yield* sl.leave()
      }
      yield* sl.leave()
      yield* sl.leave()
    }
  }
  function* walk(d) {
    for(const i of sl.sub()) {
      if (i.enter) {
        switch(i.type) {
        case Block.frame:
          const r = i.value.read
          if (r != null && r.size) {
            const value = Kit.tagValue(Tag.push,readState,
                                       {eff:true,bind:true,
                                        pat:[...pat(i,r)]})
            const nd = Object.create(d)
            for(const j of r)
              nd[j] = {ref:value}
            const lab = sl.label()
            let pos = i.pos
            if (i.pos !== Tag.push || i.value.ipat && i.value.ipat.length) {
              yield sl.enter(i.pos,Block.chain)
              pos = Tag.push
            }
            yield sl.enter(Tag.push,Block.frame,
                           {info:{hasStmts:false,hasBind:true}})
            yield tok(Tag.push,readState,value)
            yield* sl.leave()
            yield sl.peel(Kit.setPos(i,Tag.push))
            yield* walk(nd)
            yield* lab()
            continue
          }
          break
        }
      }
      yield i
    }
  }
  yield* walk({})
}

/** converts state operations in corresponding js code */
export const interpret = R.pipe(
  function* interpretStateOps(s) {
    const sl = Kit.auto(s)
    for(const i of sl) {
      switch(i.type) {
      case readState:
        if (i.enter) {
          const lab = sl.label()
          yield sl.enter(i.pos,Block.letStmt,{pat:i.value.pat})
          yield sl.enter(Tag.expression,Block.effExpr)
          yield sl.enter(Tag.expression,Tag.CallExpression,{bind:true,eff:true})
          yield* Kit.packId(sl,Tag.callee,"get")
          yield sl.enter(Tag.arguments,Tag.Array)
          yield* lab()
        }
        continue
      case writeState:
        if (i.enter) {
          const lab = sl.label()
          yield sl.enter(i.pos,Block.effExpr)
          yield sl.enter(i.pos,Tag.CallExpression,{bind:true,eff:true})
          const {write:w,copy:c} = i.value
          const vars = [...w,...c].sort((a,b) => a.num - b.num)
          if (c.size) {
            yield* Kit.packId(sl,Tag.callee,"modify")
            yield sl.enter(Tag.arguments, Tag.Array)
            yield sl.enter(Tag.push,Tag.ArrowFunctionExpression,
                           {node:{
                             expression: true,
                             params:c.size
                               ? [{type:"Identifier",name:"s"}]
                             : []}})
            yield sl.enter(Tag.body,Tag.ObjectExpression)
          } else {
            yield* Kit.packId(sl,Tag.callee,"set")
            yield sl.enter(Tag.arguments, Tag.Array)
            yield sl.enter(Tag.push,Tag.ObjectExpression)
          }
          yield sl.enter(Tag.properties,Tag.Array)
          for(const j of vars) {
            const node = {}
            yield sl.enter(Tag.push,Tag.ObjectProperty,{node})
            yield tok(Tag.key,Tag.Identifier,{node:{name:j.name}})
            if (c.has(j)) {
              yield sl.enter(Tag.value,Tag.MemberExpression)
              yield tok(Tag.object,Tag.Identifier,{node:{name:"s"}})
              yield tok(Tag.property,Tag.Identifier,{node:{name:j.name}})
              yield* sl.leave()
            } else if (w.has(j)) {
              yield tok(Tag.value,Tag.Identifier,{sym:j})
              node.shorthand = true
            } else {
              yield tok(Tag.value,Tag.NullLiteral)
            }
            yield* sl.leave()
          }
          yield* lab()
        }
        continue
      }
      yield i
    }
  },
  interpretClosureReads)


/** injects closure variable declarations for saving current state */
export function interpretClosureReads(si) {
    const s = Kit.auto(si)
    let cnt = 0
    function* walk(dict) {
      for(const i of s.sub()) {
        if (i.enter) {
          switch(i.type) {
          case Block.frame:
            yield i
            const cc = i.value.closCopy
            const sub = new Map(dict)
            if (i.value.ipat) { // TODO: move patterns to stream
              for(const j of i.value.ipat) {
                if (j.enter && j.type === Tag.Identifier && j.value.decl) {
                  sub.delete(j.value.sym)
                }
              }
            }
            if (cc && cc.size) {
              const lab = s.label()
              yield s.enter(Tag.push,Tag.VariableDeclaration,
                            {node:{kind:"let"}})
              yield s.enter(Tag.declarations,Tag.Array)
              for(const [j,c] of cc) {
                yield s.enter(Tag.push,Tag.VariableDeclarator)
                const cp = scope.newSym(j.name)
                yield s.tok(Tag.id,Tag.Identifier,{sym:cp})
                if (c)
                  yield s.tok(Tag.init,Tag.Identifier,{sym:sub.get(j) || j})
                sub.set(j,cp)
                yield* s.leave()
              }
              yield* lab()
            }
            yield* walk(sub)
            continue
          case Tag.Identifier:
            if (i.value.sym) {
              if (i.value.decl) {
                dict.delete(i.value.sym)
              } else {
                const d = dict.get(i.value.sym)
                if (d != null)
                  i.value.sym = d
              }
            }
            break
          }
        }
        yield i
      }
    }
    return walk(new Map())
  }

/** to be called in the beginning of the transformation */
export const prepare = R.pipe(
  scope.assignSym,
  scope.calcRefScopes,
  resetIdOp,
  calcVarsDataflow)

export const closure = R.pipe(
  calcClosureState)

/** final stage, injects operations to be interpreted next */
export const inject = R.pipe(
  calcStateWrites,
  calcStateReads,
  calcStateCopies,
  injectLetWrites,
  injectFrameReads
)
