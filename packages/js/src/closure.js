import * as Kit from "./kit"
import {Tag} from "./kit"
import * as assert from "assert"
import * as State from "./state"
import * as Block from "./block"
import * as Loop from "./loops"
import * as Bind from "./bind"
import * as Ctrl from "./control"

const emptyArr = []

function typeDeclToExpr(e) {
  switch(e) {
  case Tag.FunctionDeclaration:
    return Tag.FunctionExpression
  case Tag.ClassDeclaration:
    return Tag.ClassExpression
  default:
    return e
  }
}

/** 
 * converts local declarations to variable declarations with init expressions, 
 * and moves all function expressions with captured variable to a top
 */
export function* saveDecls(si) {
  const s = Kit.auto(si)
  const root = s.first.value
  const saved = root.savedDecls || (root.savedDecls = new Map())
  const decls = root.scopeDecls
  function* walk(sw) {
    for(const i of sw) {
      if (i.enter) {
        switch(i.type) {
        case Tag.FunctionExpression:
          // the whole class is moving to the first frame
          if (i.value.origType === Tag.ClassMethod)
            break
        case Tag.ArrowFunctionExpression:
        case Tag.ClassExpression:
          if (!i.value.closure)
            break
          const sym = Bind.tempVarSym(
            root,
            i.value.node && i.value.node.id
              && i.value.node.id.name,
            i.value.funcId && i.value.funcId.byVal)
          saved.set(sym,
                    {raw:null,
                     init:Kit.reposOneArr(Kit.toArray(s.copy(i)),Tag.init)})
          decls.add(sym)
          yield s.tok(i.pos,Tag.Identifier,{sym,lhs:false,rhs:true,decl:false})
          continue
        case Tag.ObjectMethod:
          const key = s.cur().value
          const msym = Bind.tempVarSym(root, key.node && key.node.name)
          yield s.enter(i.pos,Tag.ObjectProperty,
                        {node:{computed:i.value.node.computed}})
          yield* walk(s.one())
          saved.set(msym,{raw:null,init:[...function*(){
            yield s.enter(Tag.init, Tag.FunctionExpression, i.value)
            if (!i.leave)
              yield* walk(s.sub())
            yield* s.leave()
          }()]})
          decls.add(msym)
          yield s.tok(Tag.value,Tag.Identifier,
                      {lhs:false,rhs:true,decl:false,sym:msym})
          yield* s.leave()
          break
        case Tag.FunctionDeclaration:
        case Tag.ClassDeclaration:
          if (!i.value.closure)
            break
          saved.set(i.value.funcId,{raw:null,init:[...function*() {
            yield s.enter(Tag.init, typeDeclToExpr(i.type), i.value)
            if (!i.leave)
              yield* walk(s.sub())
            yield* s.leave()
          }()]})
          decls.add(i.value.funcId)
          s.close(i)
          if (i.pos !== Tag.push) {
            yield s.enter(i.pos,Tag.BlockStatement)
            yield s.tok(Tag.body,Tag.Array)
            yield* s.leave()
          }
          continue
        }
      }
      yield i
    }
  }
  yield s.peel()
  yield* walk(s.sub())
  yield* s.leave()
}


/** makes all `syms` to have uniq name among them only (with prefix `pref) */
function allUniqFields(syms,pref="") {
  const names = new Set()
  for(const sym of syms) {
    let name = `${pref}${sym.orig}`
    for(let cnt = 0;names.has(name);cnt++,name = `${pref}${sym.orig}${cnt}`){}
    names.add(name)
    sym.fieldName = name
  }
}

/** moves frame steps to top level of JS module */
export function* depsToTop(si) {
  const s = Kit.auto(si)
  const top = []
  if (!s.opts.topLevel) {
    yield* s
    return
  }
  yield* s.till(i => i.pos === Tag.body && i.type === Tag.Array)
  while(s.cur().type === Tag.ImportDeclaration)
    yield* s.one()
  yield* collect()
  for(const i of top) {
    yield* i
  }
  yield* s
  function* collect() {
    for(const i of s.sub()) {
      if (i.enter && i.type === Tag.FunctionDeclaration && i.value.frameStep) {
        const par = i.value.frameStep
        const ds = i.value.declSym
        if (par.funcId)
          ds.orig = ds.name = par.funcId.name + ds.orig
        top.push([i,...collect(),s.close(i)])
      } else
        yield i
    }
  }
}

const emptyMap = new Map()
const emptySet = new Set()

/**
 * emplaces closure capturing object definitions to store reference variables
 * between scopes, and converts captured variables to memeber expressions
 */
export function* injectStateRefs(si) {
  const s = Kit.auto(si)
  const root = s.first.value
  if (!root.closure && !(root.ctxDeps && root.ctxDeps.size)) {
    yield* s
    return
  }
  const {ctxSubst,contextSym} = root
  if (!ctxSubst || !contextSym) {
    yield* s
    return
  }
  for(const i of s) {
    if (i.enter) {
      switch(i.type) {
      case Block.letStmt:
        if (!i.value.eff)
          break
      case Ctrl.jump:
        if (i.value.ext)
          i.value.contextSym = ctxSubst.get(i.value.goto.root)
        break
      }
    }
    yield i
  }
}

/** 
 * middle step, should be run after all locals are saved in scopeDecls 
 *
 *    type RootVal = RootVal & {
 *                   // variables used to refer upper contexts 
 *                   ctxSubst?: Map<Sym,Sym>
 *                   }
 *    uses `savedDecls`, `topEff`, `contextSym`
 */
export const propagate = Kit.map(function propagate(si) {
  const s = Kit.auto(si)
  const root = s.first.value
  const ctxSyms = []
  const {ctxDeps,topEff,contextSym} = root
  const saved = root.savedDecls || (root.savedDecls = new Map())
  const decls = root.scopeDecls
  let ctxSubst
  if (ctxDeps && ctxDeps.size) {
    ctxSubst = root.ctxSubst = new Map()
    for(const i of ctxDeps) {
      const copy = Bind.tempVarSym(root,i.funcId ? i.funcId.name : "ctx")
      saved.set(copy,{raw:null,
                      init:[s.tok(Tag.init,Tag.Identifier,{sym:i.contextSym})]})
      decls.add(copy)
      ctxSubst.set(i,copy)
    }
  }
  for(const i of decls)
    if (i.interpr === Bind.ctxField)
      ctxSyms.push(i)
  // for not effectful function with captured
  if (ctxSyms.length || topEff && root.opts.scopeContext
      || root.opts.contextMethodOps) {
    contextSym.bound = true
    allUniqFields(ctxSyms,"_")
    saved.set(
      contextSym,
      {raw:null,
       init: topEff ? [
         s.enter(Tag.init, Tag.CallExpression),
         s.tok(Tag.callee, Tag.Identifier,
               {sym:Kit.sysId(s.opts.scopeConstructor || "context"),ns:false}),
         s.enter(Tag.arguments, Tag.Array),
         ...(root.wrapId
             ? [s.tok(Tag.push,Tag.Identifier,{sym:root.wrapId})]
             : []),
         ...s.leave(),
         ...s.leave()]
       : [
         s.enter(Tag.init,Tag.ObjectExpression),
         s.tok(Tag.properties,Tag.Array),
         ...s.leave()
       ]})
  }
  return s
})

export function substContextIds(si) {
  const s = Kit.auto(si)
  const root = s.first.value
  const {contextSym,ctxSubst} = root
  if (!contextSym)
    return s
  const byThis = s.opts.contextBy === "this"
  return walk()
  function* walk() {
    for(const i of s) {
      if (i.enter && i.type === Tag.Identifier) {
        const {sym} = i.value
        if (!i.value.decl && sym) {
          if (sym.interpr === Bind.ctxField) {
            assert.ok(sym.fieldName)
            yield s.enter(i.pos,Tag.MemberExpression)
            if (ctxSubst && sym.declScope !== root) {
              const copy = ctxSubst.get(sym.declScope)
              assert.ok(copy)
              if (copy.interpr === Bind.ctxField) {
                assert.ok(copy.fieldName)
                yield s.enter(Tag.object,Tag.MemberExpression)
                yield byThis ? s.tok(Tag.object,Tag.ThisExpression)
                  : s.tok(Tag.object,Tag.Identifier,
                          {sym:contextSym,lhs:false,rhs:true,decl:false})
                assert.ok(copy.fieldName)
                yield s.tok(Tag.property,Tag.Identifier,
                            {node:{name:copy.fieldName}})
                yield* s.leave()
              } else
                yield s.tok(Tag.object, Tag.Identifier,
                            {sym:copy,lhs:false,rhs:true,decl:false})
            } else {
              yield byThis ? s.tok(Tag.object,Tag.ThisExpression) :
                s.tok(Tag.object, Tag.Identifier,
                      {sym:contextSym,lhs:false,rhs:true,decl:false})
            }
            yield s.tok(Tag.property, Tag.Identifier, {node:{name:sym.fieldName}})
            yield* s.leave()
            s.close(i)
            continue
          }
        }
      }
      yield i
    }
  }
}

