import * as R from "ramda"
import * as Kit from "./kit"
import {Tag,trace,dump} from "./kit"
import * as assert from "assert"
import * as State from "./state"
import * as Block from "./block"

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

/**
 * for each by reference symbol creates a field in state object 
 * and replaces all references to the object member access
 */
export function* accessors(si) {
  const s = Kit.auto(si)
  const capt = new Set()
  const root = s.first.value
  const deps = root.closDeps = new Set()
  for(const i of s) {
    if (i.enter && i.type === Tag.Identifier
        && i.value.sym && !i.value.decl
        && i.value.sym.declScope && !i.value.sym.byVal) {
      const {sym} = i.value
      yield s.enter(i.pos,Tag.MemberExpression)
      const scope = sym.declScope
      if (!root.captSym)
        root.captSym = Kit.scope.newSym("ref_")
      if (scope === root) {
        yield s.tok(Tag.object,Tag.Identifier,{sym:root.captSym})
      } else {
        yield s.enter(Tag.object,Tag.MemberExpression)
        yield s.tok(Tag.object,Tag.Identifier,{sym:root.captSym})
        yield s.tok(Tag.property,Tag.Identifier,
                    {sym:scope.captSym
                     || (scope.captSym = Kit.scope.newSym("ref_"))})
        deps.add(scope.captSym)
        yield* s.leave()
      }
      yield s.tok(Tag.property,Tag.Identifier,{sym:i.value.sym})
      yield* s.leave()
      s.close(i)
      continue
    }
    yield i
  }
}

/** emplaces declarations for variable capturing objects */
export function* declObjects(si) {
  const s = Kit.auto(si)
  const root = s.first.value
  const vars = []
  for(const i of root.savedDecls) {
    if (!i[0].byVal) {
      vars.push(i)
      root.savedDecls.delete(i[0])
    }
  }
  if (root.closDeps) {
    for(const i of root.closDeps)
      vars.push([i,[s.tok(Tag.value,Tag.Identifier,{sym:i})]])
  }
  if (!vars.length) {
    yield* s
    return
  }
  const lab = s.label()
  yield s.peel()
  yield* s.peelTo(Tag.body)
  yield* s.peelTo(Tag.body)
  const blab = s.label()
  yield s.enter(Tag.push,Tag.VariableDeclaration,
                {node:{kind:"var"}})
  yield s.enter(Tag.declarations,Tag.Array)
  yield s.enter(Tag.push,Tag.VariableDeclarator)
  yield s.tok(Tag.id, Tag.Identifier, {sym:root.captSym})
  yield s.enter(Tag.init, Tag.ObjectExpression)
  yield s.enter(Tag.properties, Tag.Array)
  vars.sort((a,b) => a[0].num - b[0].num)
  for(let [f,v] of vars) {
    if (!v)
      v = [s.tok(Tag.value,Tag.Identifier,{sym:Kit.scope.undefinedSym})]
    const shorthand = v[0].type === Tag.Identifier && v[0].sym === f
    yield s.enter(Tag.push, Tag.ObjectProperty, {node:{shorthand}})
    yield s.tok(Tag.key, Tag.Identifier, {sym:f})
    yield* Kit.reposOne(v, Tag.value)
    yield* s.leave()
  }
  yield* blab()
  yield* s.sub()
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
        top.push([i,...s.sub(),s.close(i)])
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

