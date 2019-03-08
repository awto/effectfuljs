import * as Kit from "./kit"
import {Tag,invariant} from "./kit"
import * as State from "./state"
import * as Block from "./block"
import * as Loop from "./loops"
import * as Bind from "./bind"
import * as Ctrl from "./control"

const emptyArr = []
const emptyMap = new Map()
const emptySet = new Set()

/** moves frame steps to top level of JS module */
export function depsToTop(si) {
  const s = Kit.auto(si)
  const root = s.first.value
  const top = []
  if (!root.hasTop)
    return s
  return _depsToTop()
  function* _depsToTop() {
    yield* s.till(i => i.pos === Tag.body && i.type === Tag.Array)
    while(s.cur().type === Tag.ImportDeclaration)
      yield* s.one()
    yield* collect()
    for(const i of top) {
      yield* i
    }
    yield* s
  }
  function* collect() {
    for(const i of s.sub()) {
      if (i.enter && i.type === Tag.FunctionDeclaration && i.value.moveToTop) {
        top.push([i,...collect(),s.close(i)])
      } else
        yield i
    }
  }
}

/** 
 * adds declarations and constructions for context objects
 */
export const contextDecls = Kit.map(function contextDecls(si) {
  const s = Kit.auto(si)
  const root = s.first.value
  const ctxSyms = []
  const {topEff,contextSym} = root
  const saved = root.savedDecls || (root.savedDecls = new Map())
  const decls = root.scopeDecls
  for(const i of decls)
    if (i.interpr === Bind.ctxField)
      ctxSyms.push(i)
  // for not effectful function with captured
  if (ctxSyms.length
      || root.opts.transform && (root.opts.scopeContext
                                 || root.opts.contextMethodOps)
     ) {
    contextSym.bound = true
    State.allUniqFields(ctxSyms,s.opts.closVarPrefix,s.opts.closVarPostfix)
    // needs both because after loop block scoping pure functions may have
    // same options (TODO: unify them)
    const constr = topEff ? s.opts.scopeConstructor : s.opts.pureScopeConstructor
    const constrSym = root.constrSym = constr && Kit.sysId(constr) 
    saved.set(
      contextSym,
      {raw:null,
       init: constr ? [
         s.enter(Tag.init, Tag.CallExpression),
         s.tok(Tag.callee, Tag.Identifier,
               {sym:constrSym,ns:false}),
         s.enter(Tag.arguments, Tag.Array),
         ...(root.wrapId
             ? [s.tok(Tag.push,Tag.Identifier,{sym:root.wrapId,keepClos:true})]
             : emptyArr),
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

/** converts context fields identifier to JS member expression */
export function substContextIds(si) {
  const s = Kit.auto(si)
  const root = s.first.value
  const {opts,contextSym,ctxDeps,savedDecls:saved} = root
  const subFieldsEnabled = opts.enableSubFields || root.hasPar
  const varsSubField = subFieldsEnabled && opts.stateStorageField
  const closSubField = subFieldsEnabled
        && (opts.closureStorageField || varsSubField)
  if (!contextSym)
    return s
  return walk()
  function* emitSubField(subField) {
    if (subField) {
      yield s.enter(Tag.object,Tag.MemberExpression)
      yield s.tok(Tag.object,Tag.Identifier,
                  {sym:contextSym,lhs:false,rhs:true,decl:false})
      yield s.tok(Tag.property,Tag.Identifier,{node:{name:closSubField}})
    } else {
      yield s.tok(Tag.object,Tag.Identifier,
                  {sym:contextSym,lhs:false,rhs:true,decl:false})
    }
  }
  function* id(pos,sym) {
    invariant(sym.fieldName)
    yield s.enter(pos,Tag.MemberExpression,{origSym:sym})
    if (ctxDeps && sym.declScope !== root) {
      const info = ctxDeps.get(sym.declScope)
      invariant(info)
      const {copy} = info
      if (copy.interpr === Bind.ctxField) {
        invariant(copy.fieldName)
        yield s.enter(Tag.object,Tag.MemberExpression,{origSym:copy})
        yield* emitSubField(copy.subField || closSubField)
        yield s.tok(Tag.property,Tag.Identifier,
                    {node:{name:copy.fieldName}})
        yield* s.leave()
      } else {
        yield s.tok(Tag.object, Tag.Identifier,
                    {sym:copy,lhs:false,rhs:true,decl:false})
      }
    } else {
      yield* emitSubField(sym.subField || varsSubField)
    }
    yield s.tok(Tag.property, Tag.Identifier, {node:{name:sym.fieldName}})
    yield* s.leave()
  }
  function* walk() {
    for(const i of s) {
      if (i.enter && i.type === Tag.Identifier) {
        const {sym} = i.value
        if (!i.value.decl && sym && sym.interpr === Bind.ctxField
            && !i.value.keepClos) {
          yield* id(i.pos,sym)
          s.close(i)
          continue
        }
      }
      yield i
    }
  }
}

