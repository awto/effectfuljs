import * as R from "ramda"
import * as Kit from "./kit"
import {Tag,produce,consume,symbol,scope} from "estransducers"
import * as T from "babel-types"
import * as assert from "assert"
const {enter,leave,tok} = Kit
import * as Block from "./block"
import * as Bind from "./bind"
import * as Branch from "./branch"
import * as Loop  from "./loops"
import * as Ctrl  from "./control"
import * as Debug from "./debug"
import * as Uniq from "./uniq"
import * as trace from "estransducers/trace"

/** 
 * moves all variable declarations in decls field of a root Val
 *
 *      type Val = Val & { decls: Token[] }
 */
export const saveDecls = R.pipe(
  function* saveDecls(s) {
    const sl = Kit.auto(s)
    const top = sl.peel()
    const decls = top.value.savedDecls = new Map()
    function* walk() {
      for(const i of sl.sub()) {
        if (i.enter) {
          switch(i.type) {
          case Tag.ClassDeclaration:
          case Tag.FunctionDeclaration:
            decls.set(i.value.funcId, [...sl.copy(Kit.setPos(i,Tag.push))])
            continue
          case Tag.CatchClause:
            if (i.value.eff && sl.cur().pos === Tag.param) {
              const ids = []
              for(const j of sl.one()) {
                if (j.enter && j.type === Tag.Identifier && j.value.decl) {
                  decls.set(j.value.sym, null)
                  j.value.lhs = true
                  j.value.rhs = false
                  j.value.decl = false
                }
                ids.push(j)
              }
              const sym = Kit.scope.newSym("ex")
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
                        decls.set(j.value.sym, null)
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
    if (!top.value.topEff) {
      yield* sl.copy(top)
      return
    }
    yield top
    yield* walk()
    yield* sl.leave()
  },Kit.removeNulls,Array.from)

const emptySet = new Set()

/** restores declaration removed `saveDecls` in the beginning of root's body */
export function* restoreDecls(s) {
  const sl = Kit.auto(s)
  for(const i of sl) {
    yield i
    if (i.enter) {
      if (i.value.func && i.value.savedDecls != null && i.value.savedDecls.size) {
        for(const j of sl.sub()) {
          yield j
          if (j.enter && j.type === Tag.Array && j.pos === Tag.body) {
            const decls = [...i.value.savedDecls].sort((a,b) => a[0].num - b[0].num)
            const vars = []
            const funs = []
            for(const [k,v] of decls) {
              if (v == null) {
                if (!k.byVal)
                  vars.push(k)
              }
            }
            if (vars.length) {
              const lab = sl.label()
              yield sl.enter(Tag.push,Tag.VariableDeclaration,{node:{kind:"var"}})
              yield sl.enter(Tag.declarations,Tag.Array)
              for(const sym of vars) {
                yield sl.enter(Tag.push,Tag.VariableDeclarator)
                  yield sl.tok(Tag.id,Tag.Identifier,{sym:sym})
                yield* sl.leave()
              }
              yield* lab()
            }
            for(const j of decls)
              if (j[1] != null)
                yield* j[1]
            break
          }
        }
      }
    }
  }
}

/** calculates for each Identifier lhs/rhs fields */
export function calcRefKind(si) {
  const s = Kit.auto(si)
  function* walk(declLhs) {
    for(const i of s.sub()) {
      yield i
      if (i.enter) {
        switch(i.type) {
          /*
        case Tag.VariableDeclarator:
          const decls = []
          for(const j of s.one()) {
            yield j
            if (j.enter && j.type === Tag.Identifier
                && j.value.decl) {
              j.lhs = true
              j.rhs = false
            }
          }
          if (s.cur().pos === Tag.init) {
            for(const j of decls) {
              j.lhs = true
              j.rhs = false
            }              
          }
          break
          */
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

/** 
 * for each variable sets its usages scope (list of functions where the 
 * variable is used except declaration function)
 * 
 *     type Sym = Sym & { refScopes: Set<TokenValue>, 
 *                        funcRef?: FuncValue  -- function the symbol references,
 *                        singleAssign: boolean,
 *                        refScopes: FuncValue[],
 *                        byVal: boolean 
 *                        }
 *     type FuncValue = FuncValue & { symUsages: Map<Sym, Token[]>,
 *                                    refSym?: Sym, -- symbol the function is referred by
 *                                    scopeDecls: Set<Sym>,
 *                                    isLocal?: boolean
 *                                    }
 *     type IdValue = IdValue & { localFuncRef?: FuncValue }
 *     type LoopValue = LoopValue & { captureRefs: Set<Sym> }
 */
export function calcRefScopes(si) {
  const sa = Kit.toArray(calcRefKind(si))
  const s = Kit.auto(reorderVarUsages(sa))
  const funcs = []
  const allDecls = []
  function scope(root) {
    const symUsages = root.symUsages || (root.symUsages = new Map())
    const decls = root.scopeDecls = new Set(root.paramSyms)
    const capt = root.scopeCapt = new Set()
    const captMod = root.scopeCaptMod = new Set()
    const deps = root.scopeDeps = new Set()
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
          break
        case Tag.FunctionDeclaration:
        case Tag.FunctionExpression:
        case Tag.ObjectMethod:
        case Tag.ClassMethod:
        case Tag.ArrowFunctionExpression:
          funcs.push(i.value)
          scope(i.value)
          break
        case Tag.Identifier:
          const si = i.value.sym
          if (si != null) {
            const {lhs,rhs} = i.value
            const symRoot = si.declScope
            if (!symRoot)
              break
            if (i.value.decl) {
              assert.ok(symRoot === root)
              decls.add(si)
              si.topLevel = s.opts.topLevel
              allDecls.push(i.value)
              if (si.byVal == null)
                si.byVal = s.opts.state
            } else {
              if (si.declScope !== root) {
                (si.refScopes || (si.refScopes = new Set())).add(root)
                if (si.declScope)
                  deps.add(si.declScope)
                capt.add(si)
                if (lhs) {
                  (si.modScopes || (si.modScopes = new Set())).add(root)
                  captMod.add(si)
                }
              }
            }
            if (lhs || rhs)
              Kit.mapPush(symUsages,si,i)
          }
        }
      }
    }
  }
  scope(s.first.value)
  for(const i of allDecls) {
    const si = i.sym
    const root = si.declScope
    const usages = root.symUsages.get(si)
    si.hasRefs = usages && usages.length > 0
      || si.refScopes && si.refScopes.length
    if (!usages) {
      si.singleAssign = true
      continue
    }
    let singleAssign
    let func
    for(const j of usages) {
      const jv = j.value
      if (jv.lhs) {
        if (singleAssign == null) {
          singleAssign = true
          if (jv.source && jv.source.func) {
            func = jv.source 
          }
        } else {
          singleAssign = false
          break
        }
      }
      // somehow the program reads variable before it is assigned first
      if (jv.rhs && singleAssign == null) {
        singleAssign = false
        break
      }
    }
    if (singleAssign !== false && si.refScopes) {
      up: for (const j of si.refScopes) {
        const usages = j.symUsages.get(si)
        assert.ok(usages)
        for(const k of usages) {
          if (k.value.lhs) {
            singleAssign = false
            break up
          }
        }
      }
    }
    si.singleAssign = singleAssign
    if (singleAssign !== false) {
      if (func != null) {
        func.refSym = si
        si.funcRef = func        
      }
    }
  }
  locloop: for(const i of funcs) {
    const si = i.refSym
    if (si == null || !si.singleAssign && si.refScopes)
      continue
    const root = si.declScope
    const usages = root.symUsages.get(si)
    for(const j of usages) {
      if (j.value.rhs && j.pos !== Tag.callee)
        continue locloop
    }
    i.isLocal = true
    for(const j of usages)
      if (j.pos === Tag.callee)
        j.value.localFuncRef = i
  }
  for(const i of allDecls) {
    const si = i.sym
    if (si.byVal && si.modScopes && [...si.modScopes].find(j => !j.isLocal)) {
      si.byVal = false
      if (!si.byVal) {
        if (si.declLoop != null) {
          const capt = si.declLoop.captureRefs
                || (si.declLoop.captureRefs = new Set())
          capt.add(si)
        } 
      }
    }
    if (si.byVal && si.singleAssign && !si.topLevel)
      si.byVal = false
  }
  return sa
}

/** 
 * lhs goes before rhs in the streams, this pass reorders them so value's
 * sources are always before the target in assignments,
 * also assigns `source` field of lhs to a first token of rhs
 * returns stream of identifier values only
 * for IIFE specifies adds `isLocal` field fir the function 
 */
export function reorderVarUsages(si) {
  const s = Kit.auto(si)
  function* walk(sw) {
    for(const i of sw) {
      if (i.enter) {
        switch(i.type) {
        case Tag.CallExpression:
          const callee = s.curLev()
          if (callee) {
            switch(callee.type) {
            case Tag.FunctionExpression:
            case Tag.ArrowFunctionExpression:
              callee.value.isLocal = true
              callee.value.localFuncRef = callee.value
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
export const locals = R.pipe(localFuncDecls, localCalls)

/** 
 * calculates states reads and writes 
 */
export function calcFrameStateVars(si) {
  // const sa = Kit.toArray(recalcRefScopes(si))
  const sa = Kit.toArray(si)
  let sw = null
  for(const i of reorderVarUsages(sa)) {
    if (i.enter) {
      switch(i.type) {
      case Block.frame:
        sw = i.value.stateVars = {r:new Set(),w:new Set()}
        continue
      case Block.bindPat:
        assert.ok(sw)
        sw.r.add(i.value.sym) 
        break
      case Tag.Identifier:
        const {sym} = i.value
        if (sw != null && sym != null && sym.byVal) {
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
  return sa
}

/** to be called in the beginning of the transformation */
export const prepare = calcRefScopes


