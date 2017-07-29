import * as R from "ramda"
import * as Kit from "./kit"
import {Tag,trace,dump} from "./kit"
import * as assert from "assert"
import * as State from "./state"
import * as Block from "./block"
import * as Loop from "./loops"
import * as Bind from "./bind"

function typeDeclToExpr(e) {
  switch(e) {
  case Tag.FunctionDeclaration:
    return Tag.FunctionExpression
  case Tag.ClassDeclaration:
    return Tag.ClassExpression
  }
}

/** 
 * converts local declarations to variable 
 * declarations with init expressions 
 */
export function* declToExpr(si) {
  const s = Kit.auto(si)
  const buf = []
  function* walk() {
    for(const i of s.sub()) {
      if (i.enter) {
        switch(i.type) {
        case Tag.FunctionDeclaration:
        case Tag.ClassDeclaration:
          buf.push(...function*() {
            const lab = s.label()
            yield s.enter(Tag.push,Tag.VariableDeclaration,{node:{kind:"var"}})
            yield s.enter(Tag.declarations,Tag.Array)
            yield s.enter(Tag.push,Tag.VariableDeclarator)
            yield s.tok(Tag.id,Tag.Identifier,
                        {sym:i.value.funcId,lhs:true,rhs:false,decl:true})
            yield s.enter(Tag.init, typeDeclToExpr(i.type), i.value)
            if (!i.leave)
              yield* walk()
            yield* lab()
          }())
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
  const lab = s.label()
  yield s.peel()
  yield* s.peelTo(Tag.body)
  yield* s.peelTo(Tag.body)
  const inp = [...walk()]
  yield* buf
  yield* inp
  yield* lab()
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
  const inp = [...collect()]
  for(const i of top) {
    yield* i
  }
  yield* inp
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

/** calculates variables to be inject into an object to pass by reference */
export function calcStateRefs(si) {
  const s = Kit.auto(si)
  const root = s.first.value
  const scopes = new Set()
  if (root.scopeDecls) {
    const vars = [...root.scopeDecls].filter(i => i.interpr === Bind.objField)
    if (vars.length) {
      for(const i of vars) {
        // TODO: capture in the loop only if it is indeed needed
        const scope = i.declLoop || i.declScope;
        (scope.refVars || (scope.refVars = [])).push(i)
        scopes.add(scope)
        i.noDecl = true
        let closRefSym = scope.closRefSym
        if (!closRefSym) {
          closRefSym = scope.closRefSym
            = Bind.tempVarSym(root,
                              `${root.funcId ? root.funcId.orig : ""}_v`)
          closRefSym.closureObj = true
          closRefSym.declLoop = i.declLoop
        }
        i.closRefSym = closRefSym
      }
    }
  }
  let normilize = true
  activate: if (!root.opts.transform) {
    for(const i of root.scopeCapt)
      if (i.track)
        break activate
    for(const i of root.scopeDecls)
      if (i.track)
        break activate
    normilize = false
  }
  for(const i of scopes)
    State.allUniqFields(i.refVars)
  return normilize
}

/** emplaces object definitions to store reference variables */
export function* injectStateRefs(si) {
  const s = Kit.auto(si)
  const root = s.first.value
  const {closRefSym} = root
  const deps = new Set()
  for(const i of root.scopeCapt)
    if (i.closRefSym)
      deps.add(i.closRefSym)
  const subst = new Map()
  const decls = root.savedDecls || (root.savedDecls = new Map())
  for(const sym of deps) {
    // TODO: this extra assignment is needed just to make a symbol
    // to be local to the next function, i.e. internal symbol representation
    // limitation, could be some virtual assignment or scope related info
    // stored in scope, not in symbol
    const copy = Bind.tempVarSym(root,sym.orig,sym.byVal)
    subst.set(sym,copy)
    decls.set(copy, {raw:null, init:[s.tok(Tag.init,Tag.Identifier,{sym})]})
  }
  function* walk(scope) {
    if (scope.closRefSym) {
      const decls = scope.savedDecls || (scope.savedDecls = new Map())
      decls.set(scope.closRefSym,{raw:null,init:[...function*(){
        const lab = s.label()
        yield s.enter(Tag.init, Tag.ObjectExpression)
        yield s.enter(Tag.properties, Tag.Array)
        const names = new Set()
        for(const sym of scope.refVars) {
          yield s.enter(Tag.push, Tag.ObjectProperty,
                        {node:{shorthand:sym.param != null}})
          assert.ok(sym.fieldName)
          yield s.tok(Tag.key,Tag.Identifier,{node:{name:sym.fieldName}})
          yield s.tok(Tag.value,Tag.Identifier,
                      {sym:sym.param ? sym : Kit.scope.undefinedSym})
          yield* s.leave()
        }
        yield* lab()
      }()]})
    }
    for(const i of s.sub()) {
      if (i.enter) {
        switch(i.type) {
        case Tag.Identifier:
          const {sym} = i.value
          if (!i.value.decl && sym && sym.closRefSym) {
            root.scopeCapt.add(sym.closRefSym)
            yield s.enter(i.pos, Tag.MemberExpression)
            yield s.tok(Tag.object, Tag.Identifier,
                        {sym:subst.get(sym.closRefSym) || sym.closRefSym,
                         lhs:false,rhs:true,decl:false})
            assert.ok(sym.fieldName)
            yield s.tok(Tag.property,Tag.Identifier,{node:{name:sym.fieldName}})
            yield* s.leave()
            s.close(i)
            continue
          }
          break
        case Tag.DoWhileStatement:
        case Tag.WhileStatement:
        case Tag.ForOfStatement:
        case Tag.ForInStatement:
        case Tag.ForStatement:
        case Loop.repeat:
          if (i.value.refVars && i.value.refVars.length) {
            yield i
            yield* walk(i.value)
            continue
          }
          break
        }
      }
      yield i
    }
  }
  yield* s.till(i => i.enter && i.pos == Tag.body && i.type === Tag.Array)
  yield* walk(root)
  yield* s
}



