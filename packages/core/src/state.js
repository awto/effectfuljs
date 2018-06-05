import * as Kit from "./kit"
import {Tag,produce,consume,symbol,scope} from "@effectful/transducers"
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
    function* _saveDecls(pureTry) {
      for(const i of sl.sub()) {
        if (i.enter) {
          switch(i.type) {
          case Tag.ClassDeclaration:
            const id = sl.cur().value.sym
            decls.set(
              id,{raw:null,
                  init:[...sl.copy(
                    Kit.setType(
                      Kit.setPos(i,Tag.init),Tag.ClassExpression))]})
            continue
          case Tag.FunctionDeclaration:
            decls.set(
              i.value.funcId,{raw:null,
                              init:[...sl.copy(
                                Kit.setType(
                                  Kit.setPos(i,Tag.init),Tag.FunctionExpression))]})
            if (i.value.wrapId)
              i.value.funcId = i.value.wrapId
            continue
          case Tag.TryStatement:
            if (!i.value.eff) {
	      yield i
	      yield* _saveDecls(true)
              continue
            }
            break
          case Tag.CatchClause:
	          if (sl.cur().pos === Tag.param) {
	            if (pureTry) {
		            yield i
                for(const k of sl.one()) {
                  yield k
                  if (k.enter && k.type === Tag.Identifier
                      && k.value.sym && k.value.decl) {
                    k.value.sym.interpr = null
                  }
                }
	            } else {
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
		            yield* _saveDecls()
		            yield* lab()
              }
	            continue
	          }
            break
          case Tag.VariableDeclaration:
            const kind = i.value.node.kind
            i.value.node.kind = "var"
            const declarators = []
            const stmt = i.pos !== Tag.init && i.pos !== Tag.left
            sl.peel(i)
            sl.peel()
            for(const j of sl.sub()) {
              assert.ok(j.enter)
              assert.equal(j.type,Tag.VariableDeclarator)
              let hasInit = false
              const asgn = []
              const id = [...sl.one()]
              asgn.push(...id)
              for(const j of id) {
                if (j.enter && j.type === Tag.Identifier && j.value.decl) {
                  const sym = j.value.sym
                  if (!sym.noDecl) {
                    decls.set(sym, {raw:null,node:j.value.node})
                  }
                  j.value.decl = false
                }
              }
              if (sl.cur().pos === Tag.init) {
                asgn.push(...Kit.reposOne(sl.one(),Tag.right))
                hasInit = true
              } else if (kind === "let" && i.pos !== Tag.left)  {
                asgn.push(sl.tok(Tag.right,Tag.Identifier,{sym:Kit.scope.undefinedSym}))
                hasInit = true
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
              sl.close(j)
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
    yield* _saveDecls()
    yield* sl.leave()
  },
  Kit.removeNulls,
  handleSpecVars,
  Array.from)

/** restores declaration removed `saveDecls` in the beginning of root's body */
export function* restoreDecls(s) {
  let sl = Kit.auto(s)
  if (sl.first.type === Tag.ArrowFunctionExpression) {
    const loc = sl
    sl = Kit.auto(Kit.toArray(function*() {
      let i
      for(i of loc) {
        if (i.pos === Tag.body)
          break
        yield i
      }
      if (i.type !== Tag.BlockStatement) {
        const lab = loc.label()
        yield loc.enter(Tag.body,Tag.BlockStatement,{decls:i.value.decls})
        yield loc.enter(Tag.body,Tag.Array)
        yield loc.enter(Tag.push,Tag.ReturnStatement)
        yield loc.peel(Kit.setPos(i,Tag.argument))
        yield* loc.sub()
        yield* lab()
      } else
        yield i
      yield* loc
    }()))
  }
  const root = sl.first.value
  const {ctxDeps,savedDecls:saved} = root
  if (ctxDeps && ctxDeps.size) {
    for(const [f,{copy,fld,ctx}] of ctxDeps) {
     //  assert.ok(!fld || fld.fieldName)
      saved.set(
        copy,
        {raw:null,
         init:fld
         ? fld.interpr === Bind.ctxField
           ? [sl.enter(Tag.init,Tag.MemberExpression),
              sl.tok(Tag.object,Tag.Identifier,{sym:ctx}),
              sl.tok(Tag.property,Tag.Identifier,{node:{name:fld.fieldName}}),
              ...sl.leave()]
         : [sl.tok(Tag.init,Tag.Identifier,{sym:fld})]
         : [sl.tok(Tag.init,Tag.Identifier,{sym:ctx})]})
    }
  }
  for(const i of sl) {
    yield i
    if (i.enter) {
      if (i.value.savedDecls != null && i.value.savedDecls.size
          && !i.leave && sl.curLev()) {
        for(const j of sl.sub()) {
          yield j
          if (j.enter && j.type === Tag.Array && j.pos === Tag.body) {
            const decls = [...i.value.savedDecls].sort((a,b) => a[0].num - b[0].num)
            const vars = []
            const funs = []
            const raw = []
            const assigns = []
            for(const [k,v] of decls) {
              if (v.raw)
                raw.push(v)
              else {
                v.sym = k
                if (k.interpr === Bind.ctxField) {
                  if (v.init)
                    assigns.push({sym:k,init:Kit.reposOneArr(v.init,Tag.right)})
                } else
                  vars.push(v)
              }
            }
            if (vars.length) {
              const lab = sl.label()
              yield sl.enter(Tag.push,Tag.VariableDeclaration,{node:{kind:"var"}})
              yield sl.enter(Tag.declarations,Tag.Array)
              for(const {sym,init} of vars) {
                yield sl.enter(Tag.push,Tag.VariableDeclarator)
                yield sl.tok(Tag.id,Tag.Identifier,{sym,decl:true})
                if (init)
                  yield* init
                yield* sl.leave()
              }
              yield* lab()
            }
            if (i.value.paramSyms) {
              for(const sym of i.value.paramSyms) {
                if (sym.interpr === Bind.ctxField) {
                  const copy = sym.decl.value.sym = Kit.scope.newSym(sym.orig)
                  copy.copyOf = sym
                  sym.localCopy = copy
                  copy.type = sym.type
                  assigns.push(
                    {sym,init:[sl.tok(Tag.right,Tag.Identifier,
                                      {sym:copy,lhs:false,rhs:true,decl:false})]})
                }
              }
            }
            for(const j of decls)
              if (j[1].raw != null)
                yield* j[1].raw
            if (assigns.length) {
              for(const {sym,init} of assigns) {
                yield sl.enter(Tag.push,Tag.ExpressionStatement)
                yield sl.enter(Tag.expression,Tag.AssignmentExpression,
                               {node:{operator:"="}})
                yield sl.tok(Tag.left,Tag.Identifier,{sym,lhs:true,rhs:false,decl:false})
                yield* init
                yield* sl.leave()
                yield* sl.leave()
              }
            }
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
 *         -- function where the var is read or modified(except where declared)
 *         refScopes: FuncValue[],
 *         interpr: enum { ctxField, closureVar, paramThread
 *                         undefined -- simple local variable
 *                         .... } -- anything else specified in other passes
 *               }
 *     type ScopeVal = ScopeVal & { 
 *         scopeDecls: Set<Sym>, -- symbols declared in this scope
 *         -- captured by the scope but declared in some upper scope
 *         scopeCapt: Set<Sym>,
 *         -- scope objects (closure captured) to be used in this function
 *         ctxDeps: Map<ScopeVal,{copy:Sym,src:ScopeVal?}>
 *         }
 *     type IdValue = IdValue & { localFuncRef?: FuncValue }
 *     type LoopValue = LoopValue & { captureRefs: Set<Sym> }
 */
export function calcRefScopes(si) {
  let sa = Kit.toArray(calcVarsHandling(calcRefKind(si)))
  let s = Kit.auto(sa)
  let funcs = []
  const top = s.first.value
  top.global = true
  let allDecls = []
  let supers = new Set()
  function collectScopes(root) {
    const decls = root.scopeDecls = new Set(root.paramSyms)
    root.contextSym = Kit.scope.newSym(
      root.funcId && root.funcId.name || "ctx")
    const ctxState = root.opts.contextState
    root.contextSym.bound = s.opts.scopeContext
      || s.opts.topLevel && !s.opts.state
      || ctxState || false
    const capt = root.scopeCapt = new Set()
    if (root.savedDecls) {
      for(const i of root.savedDecls.keys())
        decls.add(i)
    } else
      root.savedDecls = new Map()
    funcs.push(root)
    root.track = false
    for(const i of s.sub()) {
      if (i.enter) {
        switch(i.type) {
        case Tag.Super:
          supers.add(root)
          break
        case Tag.FunctionDeclaration:
        case Tag.ArrowFunctionExpression:
        case Tag.FunctionExpression:
        case Tag.ObjectMethod:
        case Tag.ClassMethod:
          i.value.parentScope = root
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
              i.value.ext = false
              if (lhs)
                si.singleAssign = false
              const decl = si.declScope
              if (decl !== root) {
                (si.refScopes || (si.refScopes = new Set())).add(root)
                capt.add(si)
                // copy all vars into intermediate topLevels
                for(let j = root.parentScope;
                    j && j !== decl;
                    j = j.parentScope) {
                   if (j.opts.transform && j.opts.topLevel) {
                    j.scopeCapt.add(si)
                    si.refScopes.add(j)
                  }
                }
                i.value.ext = true
              }
            }
          }
        }
      }
    }
  }
  collectScopes(s.first.value)
  // propagating function needs transformation flag
  up: for (const i of funcs) {
    if (i.opts.transform && i.topEff) {
      for (const j of i.scopeDecls) {
        j.track = true
        if (j.refScopes) {
          for(const k of j.refScopes) {
            k.track = true
          }
        }
      }
      for (const j of i.scopeCapt) {
        j.track = true
        j.declScope.track = true
        for(const k of j.refScopes)
          k.track = true
      }
      i.track = true
    } else if (i.opts.blockScoping) {
      for(const j of i.scopeCapt)
        j.track = true
    }
  }
  // if loop's scope variable is captured somewhere else,
  // the whole loop is translated to a function, so they
  // start capturing other variables
  const loops = new Set()
  // collects loops for block scoping
  for (const i of allDecls) {
    const si = i.sym
    if (si.singleAssign && !si.byValStrict)
      si.byVal = false
    if (si.refScopes && si.track) {
      if (si.captLoop /* && si.captLoop.eff */) {
        loops.add(si.captLoop)
        si.captLoop.track = true
      }
    }
  }
  if (loops.size && s.opts.loopBlockScoping) {
    for (const i of allDecls)
      i.sym.refScopes = null
    funcs = []
    sa = Kit.toArray(Kit.scope.reset(Loop.blockScoping(sa)))
    s = Kit.auto(sa)
    allDecls = []
    collectScopes(s.first.value)
  }
  for (const i of funcs) {
    const opts = i.opts || top.opts
    if (opts.topLevel && !i.global && !opts.contextState)
      throw s.error("`topLevel:true` requires `contextState:true`",i)
    if (opts.topLevel && !i.global && opts.contextBy === "reference")
      throw s.error(
        "`topLevel:true` isn't compatible with `contextBy:'reference'`",i)
    if (opts.contextState && !i.ctxDeps && !i.global)
      i.ctxDeps = new Map()
    if (!i.funcId)
      i.funcId = Kit.scope.newSym("f")
  }
  for (const i of allDecls) {
    const si = i.sym
    si.closCapt = si.track && !!si.refScopes
    if (si.closCapt)
      si.byVal = false
    const decl = si.declScope
    if (si.refScopes && si.track && !decl.global && !si.global) {
      for (const j of si.refScopes) {
        if (j.ctxDeps) {
          if (decl !== j && !j.ctxDeps.has(decl)) {
            const fid = decl.funcId ? decl.funcId.name : "ctx"
            for (let k = j.parentScope, f = j; k; k = k.parentScope) {
              if (k === decl) {
                f.ctxDeps.set(decl,{decl,fid,ctx:decl.contextSym})
                break
              }
              if (k.opts.transform && k.opts.topLevel) {
                f.ctxDeps.set(decl,{decl,
                                    fid,
                                    ctx:k.contextSym,
                                    ref:k})
                if (k.ctxDeps.has(decl))
                  break
                f = k
              }
            }
          }
        }
      }
    }
    Bind.setSymInterpr(si)
  }
  for(const i of supers) {
    const ctxDeps = i.ctxDeps
    if (ctxDeps) {
      const p = i.parentScope
      if (p && p.opts.transform && p.opts.topLevel && !ctxDeps.has(p)) {
        const fid = p.funcId ? p.funcId.name : "ctx"
        ctxDeps.set(p,{decl:p,fid,ctx:p.contextSym})
      }
    }
  }
  for (const i of funcs) {
    if (i.ctxDeps) {
      for(const j of i.ctxDeps.values()) {
        j.copy = Bind.tempVarSym(i,j.fid)
        j.fld = j.ref && j.ref.ctxDeps.get(j.decl).copy
      }
    }
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
    if (i.interpr && i.interpr !== Bind.closureVar) {
      const sd = root.savedDecls.get(i)
      if (sd) {
        if (!sd.raw && !(sd.init && sd.init.length))
          root.savedDecls.delete(i)
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
  const functionSentSym = root.functionSentSym
  function walk(sw,fork) {
    let frame
    function addPat(p) {
      for(const j of p) {
        if (j.enter && j.type === Tag.Identifier
            && j.value.sym)
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
          frame = i.value
          if (i.value.patSym)
            sw.w.add(i.value.patSym)
          if (i.value.errSym)
            sw.w.add(i.value.errSym)
          for(const j of Kit.concat(sw.w,sw.r)) {
            if (j.interpr === Bind.ctxField && j.declScope !== root)
              sw.r.add(j)
          }
          if (functionSentSym && i.value.wfsent)
            sw.w.add(functionSentSym)
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
            // if (num !== len)
            //  sw.r.add(sym)
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
          if (goto && goto.dynamicJump) {
            if (goto.declSym.interpr)
              sw.r.add(goto.declSym)
            if (goto.catchContRedir && goto.catchContRedir.declSym.interpr)
              sw.r.add(goto.catchContRedir.declSym)
            if (goto.resultContRedir && goto.resultContRedir.declSym.interpr)
              sw.r.add(goto.resultContRedir.declSym)
          }
          if (frameArgs)
            for(const j of frameArgs.values()) {
              if (j.interpr && !sw.w.has(j))
                sw.r.add(j)
            }
          if (functionSentSym
              && (i.value.bindName === "yld" || i.value.bindName === "scope")) {
            for(const j of i.value.gotoDests)
              j.wfsent = true
          }
          break
        case Block.bindPat:
          assert.ok(sw)
          if (i.value.sym.interpr && !sw.w.has(i.value.sym))
            sw.r.add(i.value.sym)
          break
        case Tag.Identifier:
          let {sym} = i.value
          if (sw != null && sym != null) {
            if (sym === functionSentSym) {
              sw.rfsent = true
              if (sw.w.has(functionSentSym)) {
                // used in same frame, it may be simply replaced with bind var
                i.value.sym = sym = frame.patSym || frame.commonPatSym
                  || (frame.patSym = Kit.scope.newSym("p"))
                sym.dummy = false
                sym.bound = true
              }
            }
            if (sym.interpr) {
              if (i.value.rhs && !sw.w.has(sym))
                sw.r.add(sym)
              if (i.value.lhs)
                sw.w.add(sym)
            }
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
    const patSym = i.errSym || i.patSym
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

/** generates declarations for local vars */
function localsDecls(cfg) {
  for(const i of cfg) {
    const locals = i.frameLocals
    if (locals) {
      const vars = []
      if (i.first) {
        for(const j of locals) {
          if (!j.param)
            vars.push(j)
        }
      } else
        vars.push(...locals)
      if (vars.length) {
        const m = i.savedDecls || (i.savedDecls = new Map())
        for(const j of vars)
          if (!j.interpr || j.interpr === Bind.paramThread && !m.has(j))
            m.set(j, {raw:null})
      }
    }
  }
}

/** 
 * propagates informations about variable required to be read to 
 * all control flow ancestors chain (calculates `frameParamClos`)
 */
function propagateArgs(cfg) {
  // propagating writes in fact rarely needed, only if there are some
  // uninitialized variables
  const dyn = []
  function allReads(frame,seen) {
    if (frame.frameParamsClos != null)
      return frame.frameParamsClos
    if (seen.has(frame))
      return emptySet
    seen = new Set(seen)
    seen.add(frame)
    const res = new Set(frame.frameParams)
    if (frame.exits != null) {
      for (const i of frame.exits) {
        const assigned = i.frameArgs && [...i.frameArgs.keys()] || emptyArr
        for(const j of i.gotoDests) {
          const cur = new Set(allReads(j,seen))
          assigned.forEach(cur.delete,cur)
          cur.forEach(res.add,res)
        }
      }
      if (frame.catchContRedir)
        (new Set(allReads(frame.catchContRedir,seen))).forEach(res.add, res)
    }
    const locals = frame.frameLocals
    if (locals != null)
      locals.forEach(res.delete,res)
    if (frame.patSym)
      res.delete(frame.patSym)
    if (frame.errSym)
      res.delete(frame.errSym)
    return res
  }
  // propagating transitive closure of each frame's parameter
  // each frame needs to receive all vars it needs plus all the
  // frames which could be next in control flow
  for (const i of Kit.reverse(cfg)) {
    i.frameParamsClos = allReads(i,new Set())
  }
}

/** 
 * makes all `syms` to have uniq name among them only 
 * with prefix `pref` and postfix `postf`
 */
export function allUniqFields(syms,pref="",postf="") {
  const names = new Set()
  for(const sym of syms) {
    let name = `${pref}${sym.orig}${postf}`
    for(let cnt = 0;
        names.has(name);
        cnt++,name = `${pref}${sym.orig}${cnt}${postf}`){}
    names.add(name)
    sym.fieldName = name
  }
}

/** replaces this, arguments, self with special variables */
export function handleSpecVars(si) {
  const sa = Kit.toArray(si)
  // if not transform no needs to change anthing
  if (!sa[0].value.topEff)
    return sa
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
  if (thisSym) {
    decls.set(thisSym,{raw:null,
                       init:[s.tok(Tag.init,Tag.ThisExpression)]})
    root.scopeDecls.add(thisSym)
  }
  const argsSym = usesArgs && Bind.tempVarSym(root,"_args")
  if (argsSym) {
    decls.set(argsSym,
              {raw:null,
               init:[s.tok(Tag.init,Tag.Identifier,
                           {sym:Kit.scope.argumentsSym})]})
    root.scopeDecls.add(argsSym)
  }
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
          if (s.cur().type !== Tag.MemberExpression)
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
          if (!root.ref)
            break
          let classSym = root.ref.classId
          if (!classSym)
            classSym = root.ref.classId =Kit.scope.newSym("C")
          yield* s.toks(i.pos,
                        static_
                        ? "=$1.getPrototypeOf($2.prototype)"
                        : "=$1.getPrototypeOf($2.prototype)",
                        Kit.scope.ObjectSym,classSym)
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

/** if variable is used only in 1 frame no needs to store it in context */
function prepareContextVars(root, cfg) {
  const ctxSyms = []
  const resSym = root.resSym
  const opt = root.opts.optimizeContextVars !== false
  if (opt) {
    const first = cfg[0]
    for(const i of root.ctxDeps.values())
      i.copy.hasReads = true
    for(const i of cfg) {
      if (i === first)
        continue
      const sw = i.stateVars
      if (!sw)
        continue
      for(const j of sw.r)
        j.hasReads = true
    }
    for(const i of cfg) {
      if (i === first)
        continue
      const sw = i.stateVars
      if (!sw)
        continue
      for(const j of sw.w) {
        if (!j.hasReads && j !== i.patSym && j !== i.errSym && j !== resSym)
          (j.writeFrames || (j.writeFrames = new Set())).add(i)
      }

    }
  }
  for(const i of root.scopeDecls) {
    if (opt && !i.closCapt &&  !i.hasReads && i.writeFrames) {
      i.interpr = null
      i.fieldName = null
      root.savedDecls.delete(i)
      if (i.writeFrames)
        for(const f of i.writeFrames)
          (f.savedDecls || (f.savedDecls = new Map())).set(i,{raw:null})
    }
    if (i.interpr === Bind.ctxField)
      ctxSyms.push(i)
  }
  allUniqFields(ctxSyms,root.opts.closVarPrefix,root.opts.closVarPostfix)
}

export function calcFlatCfg(cfg,sa) {
  const root = sa[0].value
  calcFrameStateVars(sa)
  if (root.opts.contextState)
    prepareContextVars(root,cfg)
  resolveFrameParams(cfg)
  propagateArgs(cfg)
  localsDecls(cfg)
}


