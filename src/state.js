import * as Kit from "./kit"
import {Tag,produce,consume,symbol,scope} from "estransducers"
import * as T from "babel-types"
const {enter,leave,tok} = Kit
import * as Block from "./block"
import * as Bind from "./bind"
import * as Branch from "./branch"
import * as Loop  from "./loops"
import * as Ctrl  from "./control"

import * as assert from "assert"

const emptyArr = []
const emptySet = new Set()
const emptyMap = new Map()

/** 
 * moves all variable declarations in decls field of a root Val
 *
 *      type Val = Val & { savedDecls?: Map<Sym,{raw?:Token[],init?:Token[]}> }
 */
export const saveDecls = Kit.pipe(
  function* saveDecls(s) {
    const sl = Kit.auto(s)
    const top = sl.peel()
    const decls = top.value.savedDecls || (top.value.savedDecls = new Map())
    function* walk() {
      for(const i of sl.sub()) {
        if (i.enter) {
          switch(i.type) {
          case Tag.ClassDeclaration:
          case Tag.FunctionDeclaration:
            decls.set(i.value.funcId, {raw:[...sl.copy(Kit.setPos(i,Tag.push))]})
            continue
          case Tag.CatchClause:
            if (i.value.eff && sl.cur().pos === Tag.param) {
              const ids = []
              for(const j of sl.one()) {
                if (j.enter && j.type === Tag.Identifier && j.value.decl) {
                  decls.set(j.value.sym, {raw:null})
                  j.value.lhs = true
                  j.value.rhs = false
                  j.value.decl = false
                }
                ids.push(j)
              }
              const sym = Bind.tempVarSym(top.value,"ex")
              //Kit.scope.newSym("ex")
              //sym.interpr = Bind.paramThread
              const lab = sl.label()
              yield sl.peel(i)
              yield sl.tok(Tag.param, Tag.Identifier, {sym})
              yield sl.peel()
              yield* sl.peelTo(Tag.body)
              const blab = sl.label()
              yield sl.enter(Tag.push, Tag.ExpressionStatement)
              yield sl.enter(Tag.expression, Tag.AssignmentExpression,
                             {node:{operator:"="}})
              yield* Kit.reposOne(ids, Tag.left)
              yield sl.tok(Tag.right,Tag.Identifier,{sym,lhs:false,rhs:true,decl:false})
              yield* blab()
              yield* walk()
              yield* lab()
              continue
            }
            break
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
                    for(const j of id) {
                      if (j.enter && j.type === Tag.Identifier && j.value.decl) {
                        const sym = j.value.sym
                        if (!sym.noDecl) {
                          decls.set(sym, {raw:null})
                        }
                        j.value.decl = false
                      }
                    }
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
    yield top
    yield* walk()
    yield* sl.leave()
  },
  Kit.removeNulls,
  handleSpecVars,
  Array.from)

/** restores declaration removed `saveDecls` in the beginning of root's body */
export function* restoreDecls(s) {
  const sl = Kit.auto(s)
  for(const i of sl) {
    yield i
    if (i.enter) {
      if (i.value.savedDecls != null && i.value.savedDecls.size) {
        for(const j of sl.sub()) {
          yield j
          if (j.enter && j.type === Tag.Array && j.pos === Tag.body) {
            const decls = [...i.value.savedDecls].sort((a,b) => a[0].num - b[0].num)
            const vars = []
            const funs = []
            const raw = []
            for(const [k,v] of decls) {
              if (v.raw)
                raw.push(v)
              else {
                v.sym = k
                vars.push(v)
              }
            }
            if (vars.length) {
              const lab = sl.label()
              yield sl.enter(Tag.push,Tag.VariableDeclaration,{node:{kind:"var"}})
              yield sl.enter(Tag.declarations,Tag.Array)
              for(const {sym,init} of vars) {
                yield sl.enter(Tag.push,Tag.VariableDeclarator)
                yield sl.tok(Tag.id,Tag.Identifier,{sym})
                if (init)
                  yield* init
                yield* sl.leave()
              }
              yield* lab()
            }
            for(const j of decls)
              if (j[1].raw != null)
                yield* j[1].raw
            break
          }
        }
      }
    }
  }
}

/** calculates for each Identifier lhs/rhs fields */
function calcRefKind(si) {
  const s = Kit.auto(si)
  function* walk(declLhs) {
    for(const i of s.sub()) {
      yield i
      if (i.enter) {
        switch(i.type) {
        case Tag.AssignmentExpression:
          for(const j of s.one()) {
            yield j
            if (j.enter && j.type === Tag.Identifier && j.value.sym) {
              j.value.lhs = true
              j.value.rhs = i.value.node.operator !== "="
            }
          }
          break
        case Tag.UpdateExpression:
          const j = s.cur()
          if (j.type === Tag.Identifier) {
            j.value.lhs = true
            j.value.rhs = true
            yield* s.one()
          }
          break
        case Tag.Identifier:
          if (i.value.sym) {
            i.value.lhs = i.value.decl
            i.value.rhs = !i.value.decl
          }
          break
        }
      }
    }
  }
  return walk()
}

/** identifier is passed threaded between effectful frames as their args */
export const byVal = symbol("state.byVal")
/** identifier is passed as field of an object */
export const byRef = symbol("state.byRef")

/** handles byVal, byRef directives */
function calcVarsHandling(si) {
  const s = Kit.auto(si)
  const top = s.first.value
  function* walk() {
    for(const i of s.sub()) {
      if (i.enter) {
        switch(i.type) {
        case byVal:
        case byRef:
          for(const i of s.sub()) {
            if (i.enter) {
              if (i.type !== Tag.Identifier || i.value.sym)
                throw s.error("expected list of declared identifiers")
              i.value.sym.byVal = i.type === byVal
              i.value.sym.byValStrict = true
            }
          }
          s.close(i)
          continue
        case Tag.Identifier:
          const si = i.value.sym
          if (si != null && si.decl) {
            const symRoot = si.declScope
            si.global = !symRoot || symRoot === top
            si.track = !!s.track
            if (si.byVal == null)
              si.byVal = !si.global && s.opts.state
            si.singleAssign = undefined
          }
        }
      }
      yield i
    }
  }
  return walk()
}
 
/** 
 * for each variable sets its usages scope (list of functions where the 
 * variable is used except declaration function)
 * 
 *     type Sym = Sym & 
 *       { refScopes: Set<TokenValue>, 
 *         funcRef?: FuncValue -- function the symbol references
 *         singleAssign: boolean,
 *         -- function where the var is read or modified (except where declared)
 *         refScopes: FuncValue[],
 *         interpr: enum { ctxField, objField, ctxObjField, paramThread
 *                         undefined -- simple local variable
 *                         .... } -- anything else specified in other passes
 *               }
 *     type ScopeVal = ScopeVal & { 
 *         scopeDecls: Set<Sym>, -- symbols declared in this scope
 *         -- captured by the scope but declared in some upper scope
 *         scopeCapt: Set<Sym>, 
 *         }
 *     type IdValue = IdValue & { localFuncRef?: FuncValue }
 *     type LoopValue = LoopValue & { captureRefs: Set<Sym> }
 */
export function calcRefScopes(si) {
  let sa = Kit.toArray(calcVarsHandling(calcRefKind(si)))
  let s = Kit.auto(sa)
  const funcs = []
  const top = s.first.value
  top.global = true
  let allDecls = []
  function collectScopes(root) {
    const decls = root.scopeDecls = new Set(root.paramSyms)
    const capt = root.scopeCapt = new Set()
    const captMod = root.scopeCaptMod = new Set()
    funcs.push(root)
    root.track = false
    for(const i of s.sub()) {
      if (i.enter) {
        switch(i.type) {
        case Tag.FunctionDeclaration:
        case Tag.ArrowFunctionExpression:
        case Tag.FunctionExpression:
        case Tag.ObjectMethod:
        case Tag.ClassMethod:
          collectScopes(i.value)
          break
        case Tag.Identifier:
          const si = i.value.sym
          if (si != null) {
            const {lhs,rhs} = i.value
            const symRoot = si.declScope
            if (!symRoot)
              break
            if (i.value.decl) {
              symRoot.scopeDecls.add(si)
              allDecls.push(i.value)
              si.singleAssign = si.singleAssign == null ? lhs : false
            } else {
              // TODO: analyze CFG to get more instances
              if (lhs)
                si.singleAssign = false
              if (si.declScope !== root) {
                (si.refScopes || (si.refScopes = new Set())).add(root)
                capt.add(si)
              }
            }
          }
        }
      }
    }
  }
  collectScopes(s.first.value)
  // propagating function needs transformation flag
  up: for(const i of funcs) {
    if (i.opts.transform) {
      for(const j of i.scopeDecls) {
        j.track = true
        if (j.refScopes) {
          for(const k of j.refScopes) {
            k.track = true
          }
        }
      }
      for(const j of i.scopeCapt) {
        j.track = true
        j.declScope.track = true
        for(const k of j.refScopes)
          k.track = true
      }
      i.track = true
    }
  }
  // if loop's scope variable is captured somewhere else,
  // the whole loop is translated to a function, so they
  // start capturing other variables
  const loops = new Set()
  // collects loops for block scoping
  for(const i of allDecls) {
    const si = i.sym
    if (si.singleAssign && !si.byValStrict)
      si.byVal = false
    if (si.refScopes && si.track && si.refScopes) {
      if (si.captLoop) {
        loops.add(si.captLoop)
        si.captLoop.track = true
      }
    }
  }
  if (loops.size) {
    for(const i of allDecls)
      i.sym.refScopes = null
    sa = Kit.toArray(Kit.scope.reset(Loop.blockScoping(sa)))
    s = Kit.auto(sa)
    allDecls = []
    collectScopes(s.first.value)
  }
  for(const i of allDecls) {
    const si = i.sym
    si.closCapt = si.track && !!si.refScopes
    if (si.closCapt)
      si.byVal = false
    Bind.setSymInterpr(si)
  }
  return sa
}

/** 
 * lhs goes before rhs in the streams, this pass reorders them so value's
 * sources are always before the target in assignments,
 * also assigns `source` field of lhs to a first token of rhs
 * returns stream of identifier values only
 * for IIFE specifies adds `isLocal` field for the function 
 */
export function reorderVarUsages(si) {
  const s = Kit.auto(si)
  function* walk(sw) {
    for(const i of sw) {
      if (i.enter) {
        switch(i.type) {
        case Tag.CallExpression:
          if (s.opts.localCallOpt) {
            const callee = s.curLev()
            if (callee) {
              switch(callee.type) {
              case Tag.FunctionExpression:
              case Tag.ArrowFunctionExpression:
                callee.value.isLocal = true
                callee.value.localFuncRef = callee.value
              }
            }
          }
          break
        case Tag.FunctionDeclaration:
          yield* s.one()
        case Tag.FunctionExpression:
          const j = s.curLev()
          if (j && j.pos === Tag.id) {
            j.value.source = i.value
          }
          break
        case Tag.AssignmentExpression:
        case Tag.VariableDeclarator:
          yield i
          const first = [...s.one()]
          const l = s.curLev()
          if (l)
            first[0].value.source = l.value
          yield* walk(s.one())
          yield* first
          continue
        }
      }
      yield i
    }
  }
  return walk(s)
}

/** adds captured variables arguments of local functions to their calls */
function localCalls(si) {
  const s = Kit.auto(si)
  function* walk() {
    for(const i of s.sub()) {
      yield i
      if (i.enter && i.pos === Tag.callee && i.value.localFuncRef) {
        const sc = i.value.localFuncRef.scopeCapt
        if (sc) {
          if (!i.leave) {
            yield* walk()
            yield s.close(i)
          }
          const j = s.take()
          yield j
          assert.equal(j.type, Tag.Array)
          assert.equal(j.pos, Tag.arguments)
          for(const sym of sc)
            if (sym.byVal)
              yield s.tok(Tag.push,Tag.Identifier,{sym})
        }
      }
    }
  }
  return walk()
}

/** adds captured variables parameters to local functions */
function* localFuncDecls(si) {
  const s = Kit.auto(si)
  for(const i of s) {
    yield i
    if (i.enter) {
      if (!i.leave && i.value.func && i.value.isLocal && i.value.scopeCapt) {
        yield* s.till(j => j.enter && j.pos === Tag.params)
        for(const sym of i.value.scopeCapt)
          if (sym.byVal)
            yield s.tok(Tag.push,Tag.Identifier,{sym})
      }
    }
  }
}

/** adds captured variables parameters/arguments of functions and calls */
export const locals = Kit.pipe(localFuncDecls, localCalls)

/** 
 * calculates states reads and writes into 
 *
 *  type FrameVal = FrameVal & { 
 *     r: Set<Sym>, // vars read by the frame 
 *     w: Set<Sym>, // written in the frame
 *     } 
 */
export function calcFrameStateVars(si) {
  const sa = Kit.toArray(si)
  const root = sa[0].value
  // removing useless variable declarations in top level
  for(const i of root.scopeDecls) {
    if (i.interpr && !i.closureObj) {
      const sd = root.savedDecls.get(i)
      if (sd) {
        if (!sd.raw && !(sd.init && sd.init.length)) {
          root.savedDecls.delete(i)
        }
      }
    }
  }
  let first = {r:new Set(),w:new Set()}
  if (root.paramSyms)
    root.paramSyms.forEach(Set.prototype.add,first.w)
  for(const [sym,{raw,init}] of root.savedDecls) {
    if (init)
      first.w.add(sym)
  }
  const s = Kit.auto(Branch.mark(reorderVarUsages(sa)))
  function walk(sw,fork) {
    function addPat(p) {
      for(const j of p) {
        if (j.enter && j.type === Tag.Identifier && j.value.sym)
          sw.w.add(j.value.sym)
      }
    }
    for(const i of s.sub()) {
      if (i.enter) {
        switch(i.type) {
        case Block.frame:
          if (first) {
            first = undefined
          } else {
            sw = {r:new Set(),w:new Set()}
          }
          i.value.stateVars = sw
          if (i.value.patSym)
            sw.w.add(i.value.patSym)
          if (i.value.exceptSym)
            sw.w.add(i.value.exceptSym)
          continue
        case Branch.fork:
          const threads = []
          walk(sw,threads)
          let len = threads.length
          const allW = new Map()
          const allR = new Set()
          for(const j of threads) {
            for(const k of j.w)
              if (!sw.w.has(k))
                allW.set(k, (allW.get(k) || 0) + 1)
            for(const k of j.r)
              if (!sw.w.has(k))
                allR.add(k)
          }
          if (!threads[len-1].alt)
            len++
          for(const [sym,num] of allW) {
            sw.w.add(sym)
            // not each branch resets the symbol
            // so it needs to read it to pass further
            // TODO: may be optimized (useless var read)
            if (num !== len)
              sw.r.add(sym)
          }
          for(const k of allR)
            sw.r.add(k)
          break
        case Branch.thread:
          const nxt = {r:new Set(),w:new Set(),alt:i.pos === Tag.alternate}
          walk(nxt)
          fork.push(nxt)
          break
        case Block.letStmt:
          if (!i.value.eff) {
            if (i.value.sym)
              sw.w.add(i.value.sym)
            break
          }
        case Ctrl.jump:
          const {goto,frameArgs} = i.value
          if (goto && goto.dynamicJump && goto.declSym.state)
            sw.r.add(goto.declSym)
          if (frameArgs)
            for(const j of frameArgs.values())
              if (j.state && !sw.w.has(j))
                sw.r.add(j)
          break
        case Block.bindPat:
          assert.ok(sw)
          if (!sw.w.has(i.value.sym))
            sw.r.add(i.value.sym)
          break
      case Tag.Identifier:
          const {sym} = i.value
          if (sw != null && sym != null && sym.track) {
            if (i.value.rhs && !sw.w.has(sym))
              sw.r.add(sym)
            if (i.value.lhs)
              sw.w.add(sym)
          }
          break
        }
        if (sw != null && i.pos === Tag.callee) {
          const fun = i.value.localFuncRef
          if (fun) {
            for(const sym of fun.scopeCapt)
              if (sym.byVal && !sw.w.has(sym))
                sw.r.add(sym)
            for(const sym of fun.scopeCaptMod)
              if (sym.byVal)
                sw.w.add(sym)
          }
        }
      }
    }
  }
  walk(first)
  return sa
}

/** to be called in the beginning of the transformation */
export const prepare = calcRefScopes

/**
 * calculates parameters for each frame definition
 */
function resolveFrameParams(cfg) {
  for(const i of cfg) {
    const locals = i.frameLocals = new Set()
    const params = i.frameParams
          || (i.frameParams = new Set())
    const sw = i.stateVars
    const exits = i.exits
    const patSym = i.patSym || i.exceptSym
    if (sw != null) {
      for(const i of sw.r)
        params.add(i)
      if (exits != null) {
        for(const j of sw.w) {
          if (j.track && j !== patSym
              && !sw.r.has(j) && !params.has(j))
            locals.add(j)
        }
      }
    }
  }
}

function localsDecls(cfg) {
  for(const i of cfg) {
    const locals = i.frameLocals
    if (locals) {
      const vars = []
      if (i === cfg[0]) {
        for(const j of locals) {
          if (!j.param)
            vars.push(j)
        }
      } else
        vars.push(...locals)
      if (vars.length) {
        const m = i.savedDecls || (i.savedDecls = new Map())
        for(const j of vars)
          if (j.interpr === Bind.paramThread && !m.has(j))
            m.set(j, {raw:null})
      }
    }
  }
}

/** 
 * calculates what should be passed to binds on each `goto` and what should
 * be received in each frame's arguments
 *
 *     type FrameVal = FrameVal & { threadParams: Sym[] }
 *     type JumpVal = JumpVal & { threadArgs: Sym[][] }
 *
 *     (cfg: FrameVal[]) => {} 
 */
function resolveFrameArgs(cfg,root) {
  for(const i of cfg) {
    i.threadParams = [...i.frameParamsClos].sort((a, b) => a.num - b.num)
    const visible = [
      ...i.frameParamsClos,
      ...i.frameLocals || emptyArr].map(i => [i,i])
    if (i.patSym)
      visible.push([i.patSym,i.patSym])
    if (i.exceptSym)
      visible.push([i.exceptSym,i.exceptSym])
    for(const j of i.exits) {
      const [dst] = j.gotoDests
      if (dst == null) {
        j.threadArgs = []
        continue
      }
      let params = dst.frameParamsClos || emptyArr
      const argsMap = new Map([...visible,
                               ...(j.frameArgs ? j.frameArgs : emptyArr)])
      const args = []
      for(const k of params)
        args.push([k,argsMap.get(k) || Kit.scope.undefinedSym])
      args.sort(([a],[b]) => a.num - b.num)
      j.threadArgs = args.filter(i => i[0].interpr === Bind.paramThread)
      if (j.exceptSym)
        j.threadArgs.unshift([j.exceptSym,j.exceptSym])
    }
  }
  for(const i of cfg) {
    i.threadParams = i.threadParams.filter(
      i => i.interpr === Bind.paramThread)
    if (i.patSym && (i.threadParams.length || !i.patSym.dummy))
      i.threadParams.unshift(i.patSym)
    if (i.exceptSym)
      i.threadParams.unshift(i.exceptSym)
  }
}

/** 
 * propagates informations about variable required to be read to 
 * all control flow ancestors chain
 * 
 */
function propagateArgs(cfg,root) {
  // propagating writes in fact rarely needed, only if there are some
  // uninitialized variables
  const dyn = []
  // checks what symbols may be assigned till the frame
  function calcAvail(frame,seen) {
    if (frame.frameAvail != null)
      return frame.frameAvail
    if (seen.has(frame))
      return emptySet
    seen.add(frame)
    const res = new Set()
    if (frame.enters != null && frame.enters.length) {
      for(const i of frame.enters) {
        if (i.frameArgs) {
          for(const j of i.frameArgs.keys())
            res.add(j)
        }
        const src = i.ref
        if (src.frameLocals)
          src.frameLocals.forEach(res.add,res)
        if (i.ref.patSym)
          res.add(i.ref.patSym)
        calcAvail(src,seen).forEach(res.add,res)
      }
    } else {
      if (root.paramSyms != null) {
        for(const i of root.paramSyms)
          res.add(i)
      }
      if (root.scopeCapt != null) {
        for(const i of root.scopeCapt)
          res.add(i)
      }
    }
    return res
  }
  function allReads(frame,seen) {
    if (frame.frameParamsClos != null)
      return new Set(frame.frameParamsClos)
    if (seen.has(frame))
      return emptySet
    seen.add(frame)
    const res = new Set(frame.frameParams)
    if (frame.exits != null) {
      for (const i of frame.exits) {
        const assigned = i.frameArgs && [...i.frameArgs.keys()] || emptyArr
        for(const j of i.gotoDests) {
          const cur = allReads(j,seen)
          assigned.forEach(cur.delete,cur)
          cur.forEach(res.add,res)
        }
      }
    }
    const locals = frame.frameLocals
    if (locals != null)
      locals.forEach(res.delete,res)
    if (frame.patSym)
      res.delete(frame.patSym)
    const avail = frame.frameAvail
    if (avail != null)
      for(const i of res)
        if (!avail.has(i))
          res.delete(i)
    return res
  }
  // preparing transitive closure of each jump argument
  for (const i of cfg) {
    const assigned = i.frameAvail = calcAvail(i,new Set())
    const params = i.frameParams
    const locals = i.frameLocals
    const exceptSym = i.exceptSym
    for (const j of i.exits) {
      if (j.gotoDests.length > 1)
        dyn.push(j.gotoDests)
    }
    for (const j of params) {
      if (!assigned.has(j)) {
        params.delete(j)
        locals.add(j)
      }
    }
  }
  // propagating transitive closure of each frame's parameter
  // each frame needs to receive all vars it needs plus all the
  // frames which could be next in control flow
  for (const i of Kit.reverse(cfg)) {
    i.frameParamsClos = allReads(i, new Set())
  }
  // unifying instances of dynamic jump, so all destinations frames
  // should have same sequences of parameters
  for(let i, store = new Map(); (i = dyn.pop()) != null;) {
    const params = new Set()
    for(const j of i)
      j.frameParamsClos.forEach(params.add,params)
    const redo = new Set()
    for(const j of i) {
      const dummy = new Set(params)
      const fparams = j.frameParamsClos
      fparams.forEach(dummy.delete,dummy)
      let si = store.get(j)
      store.set(j,si = new Set())
      if (dummy.size) {
        dummy.forEach(fparams.add,fparams)
        // avoiding duplicate decls
        const {frameLocals:fl} = j
        if (fl != null)
          dummy.forEach(fl.delete,fl)
        dyn.push(...si)
      }
      si.add(i)
    }
  }
}

export function resolveCtxFrameArgs(cfg,root) {
  const ctxSyms = []
  for(const i of root.scopeDecls)
    if (i.interpr === Bind.ctxField)
      ctxSyms.push(i)
  allUniqFields(ctxSyms,"_")
  for(const i of cfg) {
    for(const j of i.exits) {
      const free = []
      for(const sym of i.frameParamsClos) {
        if (j.gotoDests) {
          for(const k of j.gotoDests) {
            if (!k.frameParamsClos.has(sym))
              free.push(sym)
          }
        } else {
          free.push(...i.frameParamsPush)
        }
      }
      if (free.length)
        j.freeVars = free.sort((a,b) => a.num - b.num)
    }
  }
}

/** makes all `syms` to have uniq name among them only (with prefix `pref) */
export function allUniqFields(syms,pref="") {
  const names = new Set()
  for(const sym of syms) {
    let name = `${pref}${sym.orig}`
    for(let cnt = 0;names.has(name);cnt++,name = `${pref}${sym.orig}${cnt}`){}
    names.add(name)
    sym.fieldName = name
  }
}

/** replaces this, arguments, self with special variables */
export function handleSpecVars(si) {
  const sa = Kit.toArray(si)
  let usesThis = false, usesArgs = false
  function collect() {
    const s = Kit.auto(sa)
    for(const i of s) {
      if (i.enter) {
        switch(i.type) {
        case Tag.Super:
          usesThis = true
          break
        case Tag.ThisExpression:
          usesThis = true
          break
        case Tag.Identifier:
          if (i.value.sym === Kit.scope.argumentsSym)
            usesArgs = true
          break
        case Tag.MemberExpression:
          if (s.cur().type === Tag.Supper) {
          }
        }
      }
    }
  }
  collect()
  const s = Kit.auto(sa)
  const root = s.first.value
  const static_ = root.node && root.node.static
  if (!usesThis && !usesArgs)
    return sa
  const decls = root.savedDecls || (root.savedDecls = new Map())
  const thisSym = usesThis && Bind.tempVarSym(root,"_this")
  if (thisSym)
    decls.set(thisSym,{raw:null,
                       init:[s.tok(Tag.init,Tag.ThisExpression)]})
  const argsSym = usesArgs && Bind.tempVarSym(root,"_args")
  if (argsSym)
    decls.set(argsSym,
              {raw:null,
               init:[s.tok(Tag.init,Tag.Identifier,
                           {sym:Kit.scope.argumentsSym})]})
  function* walk() {
    for(const i of s.sub()) {
      if (i.enter) {
        switch(i.type) {
        case Tag.ThisExpression:
          assert.ok(thisSym)
          Kit.skip(s.copy(i))
          yield s.tok(i.pos, Tag.Identifier,
                      {sym:thisSym,lhs:false,rhs:true,decl:false})
          continue
        case Tag.CallExpression:
          if (static_ && s.cur().type !== Tag.MemberExpression)
            break
          const m = s.take()
          if (s.cur().type !== Tag.Super) {
            yield i
            yield m
            continue
          }
          yield i
          yield s.enter(Tag.callee,Tag.MemberExpression)
          yield s.enter(Tag.object,Tag.MemberExpression,m.value)
          yield* walk()
          yield* s.leave()
          s.close(m)
          yield s.tok(Tag.property,Tag.Identifier,{node:{name:"call"}})
          yield* s.leave()
          yield* s.till(i => i.pos === Tag.arguments)
          yield s.tok(Tag.push,Tag.Identifier,
                      {sym:thisSym,lhs:false,rhs:true,decl:false})
          continue
        case Tag.Super:
          /*
          yield s.enter(i.pos,Tag.MemberExpression)
          yield s.tok(Tag.object,Tag.Identifier,
                      {sym:thisSym,lhs:false,rhs:true,decl:false})
          yield s.tok(Tag.property,Tag.Identifier,{node:{name:"__proto__"}})
          yield* s.leave()
          */
          yield* s.toks(i.pos,
                        "=$I.getPrototypeOf($I)",
                        Kit.scope.ObjectSym,thisSym)
          s.close(i)
          continue
        case Tag.Identifier:
          if (i.value.sym === Kit.scope.argumentsSym) {
            assert.ok(argsSym)
            Kit.skip(s.copy(i))
            yield s.tok(i.pos, Tag.Identifier,
                        {sym:argsSym,lhs:false,rhs:true,decl:false})
            continue
          }
        }
      }
      yield i
    } 
  }
  return walk()
}

export function calcFlatCfg(cfg,sa) {
  const root = sa[0].value
  const opts = root.opts
  calcFrameStateVars(sa)
  resolveFrameParams(cfg)
  propagateArgs(cfg,root)
  resolveCtxFrameArgs(cfg,root)
  resolveFrameArgs(cfg,root)
  localsDecls(cfg)
}

