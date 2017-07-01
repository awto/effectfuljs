import * as R from "ramda"
import * as Kit from "./kit"
import {Tag,trace,dump} from "./kit"
import * as assert from "assert"
import * as State from "./state"
import * as Block from "./block"
import * as Loop from "./loops"

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
            yield s.enter(Tag.push, Tag.VariableDeclaration, {node:{kind:"var"}})
            yield s.enter(Tag.declarations, Tag.Array)
            yield s.enter(Tag.push, Tag.VariableDeclarator)
            yield s.tok(Tag.id,Tag.Identifier,
                        {sym:i.value.funcId,lhs:true,rhs:true,decl:true})
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
  const inp = [...collect()]
  for(const i of top) {
    yield* i
  }
  yield* inp
  yield* s
}


/** calculates variables to be inject into an object to pass by reference */
export function calcStateRefs(si) {
  const s = Kit.auto(si)
  const root = s.first.value
  const scopes = new Set()
  if (root.scopeDecls) {
    const vars = [...root.scopeDecls].filter(i => !i.byVal)
    if (vars.length) {
      for(const i of root.scopeDecls) {
        if (i.byVal || !i.hasRefs)
          continue
        root.savedDecls.delete(i)
        const scope = i.declLoop || i.declScope;
        (scope.refVars || (scope.refVars = [])).push(i)
        scopes.add(scope)
        let stateRefSym = scope.stateRefSym
        if (!stateRefSym) {
          stateRefSym = scope.stateRefSym
            = Kit.scope.newSym(
              `${root.funcId ? root.funcId.orig : ""}_v`)
          stateRefSym.byVal = true
          stateRefSym.declScope = root
          stateRefSym.declLoop = i.declLoop
        }
        i.stateRefSym = stateRefSym
      }
    }
  }
  for(const i of scopes) {
    const names = new Set()
    for(const sym of i.refVars) {
      let name = sym.orig
      for(let cnt = 0;names.has(name);cnt++,name = `${sym.orig}${cnt}`){}
      names.add(name)
      sym.fieldName = name
    }
  }
  return s
}

/** emplaces object definitions to store reference variables */
export function* injectStateRefs(si) {
  const s = Kit.auto(si)
  const root = s.first.value
  function* walk(scope) {
    if (scope.stateRefSym) {
      const lab = s.label()
      yield s.enter(Tag.push, Tag.ExpressionStatement)
      yield s.enter(Tag.expression, Tag.AssignmentExpression,
                    {node:{operator:"="}})
      if (scope.savedDecls)
        scope.savedDecls.set(scope.stateRefSym,null)
      yield s.tok(Tag.left, Tag.Identifier,
                  {sym:scope.stateRefSym,lhs:true,rhs:false,decl:false})
      yield s.enter(Tag.right, Tag.ObjectExpression)
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
    }
    for(const i of s.sub()) {
      if (i.enter) {
        switch(i.type) {
        case Tag.Identifier:
          const {sym} = i.value
          if (!i.value.decl && sym && sym.stateRefSym) {
            root.scopeCapt.add(sym.stateRefSym)
            yield s.enter(i.pos, Tag.MemberExpression)
            yield s.tok(Tag.object, Tag.Identifier,
                        {sym:sym.stateRefSym,lhs:false,rhs:true,decl:false})
            assert.ok(sym.fieldName)
            yield s.tok(Tag.property, Tag.Identifier,{node:{name:sym.fieldName}})
            yield* s.leave()
            s.close(i)
            continue
          }
          break
        case Loop.repeat:
          if (scope.refVars && scope.refVars.length) {
            const lab = s.label()
            yield s.peel(i)
            yield* s.peelTo(Tag.body)
            yield* s.peelTo(Tag.body)
            yield* walk(i.value)
            yield* lab()
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



