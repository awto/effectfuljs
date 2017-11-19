import * as Kit from "./kit"
import {Tag} from "./kit"
import * as assert from "assert"
import * as State from "./state"
import * as Block from "./block"
import * as Loop from "./loops"
import * as Bind from "./bind"
import * as Ctrl from "./control"

const emptyArr = []

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
export function depsToTop(si) {
  const s = Kit.auto(si)
  const top = []
  if (!s.opts.topLevel)
    return s
  return walk()
  function* walk() {
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

/** converts context fields identifier to JS member expression */
export function substContextIds(si) {
  const s = Kit.auto(si)
  const root = s.first.value
  const {contextSym,ctxDeps,savedDecls:saved} = root
  if (!contextSym)
    return s
  return walk()
  function* id(pos,sym) {
    assert.ok(sym.fieldName)
    yield s.enter(pos,Tag.MemberExpression)
    if (ctxDeps && sym.declScope !== root) {
      const info = ctxDeps.get(sym.declScope)
      assert.ok(info)
      const {copy} = info
      if (copy.interpr === Bind.ctxField) {
        assert.ok(copy.fieldName)
        yield s.enter(Tag.object,Tag.MemberExpression)
        yield s.tok(Tag.object,Tag.Identifier,
                    {sym:contextSym,lhs:false,rhs:true,decl:false})
        assert.ok(copy.fieldName)
        yield s.tok(Tag.property,Tag.Identifier,
                    {node:{name:copy.fieldName}})
        yield* s.leave()
      } else
        yield s.tok(Tag.object, Tag.Identifier,
                    {sym:copy,lhs:false,rhs:true,decl:false})
    } else {
      yield s.tok(Tag.object, Tag.Identifier,
                  {sym:contextSym,lhs:false,rhs:true,decl:false})
    }
    yield s.tok(Tag.property, Tag.Identifier, {node:{name:sym.fieldName}})
    yield* s.leave()
  }
  function* walk() {
    for(const i of s) {
      if (i.enter && i.type === Tag.Identifier) {
        const {sym} = i.value
        if (!i.value.decl && sym && sym.interpr === Bind.ctxField) {
          yield* id(i.pos,sym)
          s.close(i)
          continue
        }
      }
      yield i
    }
  }
}

