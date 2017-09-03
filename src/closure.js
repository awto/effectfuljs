import * as Kit from "./kit"
import {Tag} from "./kit"
import * as assert from "assert"
import * as State from "./state"
import * as Block from "./block"
import * as Loop from "./loops"
import * as Bind from "./bind"

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
  const decls = root.savedDecls || (root.savedDecls = new Map())
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
          decls.set(sym,
                    {raw:null,
                     init:Kit.reposOneArr(Kit.toArray(s.copy(i)),Tag.init)})
          yield s.tok(i.pos,Tag.Identifier,{sym,lhs:false,rhs:true,decl:false})
          continue
        case Tag.ObjectMethod:
          const key = s.cur().value
          const msym = Bind.tempVarSym(root, key.node && key.node.name)
          yield s.enter(i.pos,Tag.ObjectProperty,
                        {node:{computed:i.value.node.computed}})
          yield* walk(s.one())
          decls.set(msym,{raw:null,init:[...function*(){
            yield s.enter(Tag.init, Tag.FunctionExpression, i.value)
            if (!i.leave)
              yield* walk(s.sub())
            yield* s.leave()
          }()]})
          yield s.tok(Tag.value,Tag.Identifier,
                      {lhs:false,rhs:true,decl:false,sym:msym})
          yield* s.leave()
          break
        case Tag.FunctionDeclaration:
        case Tag.ClassDeclaration:
          if (!i.value.closure)
            break
          decls.set(i.value.funcId,{raw:null,init:[...function*() {
            yield s.enter(Tag.init, typeDeclToExpr(i.type), i.value)
            if (!i.leave)
              yield* walk(s.sub())
            yield* s.leave()
          }()]})
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

/** 
 * calculates variables to be inject into an object to pass by reference 
 * for each loop with captured block scoped variables creates IIFE
 */
export function calcStateRefs(si) {
  const s = Kit.auto(si)
  const root = s.first.value
  const refVars = []
  if (root.scopeDecls) {
    for(const i of root.scopeDecls) {
      (root.captVars || (root.captVars = [])).push(i)
    }
    const vars = [...root.scopeDecls].filter(i => i.interpr === Bind.objField)
    if (vars.length) {
      for(const i of vars) {
        // TODO: capture in the loop only if it is indeed needed
        refVars.push(i)
        i.noDecl = true
      }
    }
  }
  let closure = true
  if (!refVars) {
    for(const i of root.scopeCapt)
      if (i.track) {
        closure = false
        break
      }
  }
  root.closure = closure
  if (root.ref)
    root.ref.closure = root.ref.closure || closure
  root.track = !!root.opts.transform || closure
  if (refVars.length) {
    root.refVars = refVars
    const closRefSym = root.closRefSym
          = Bind.tempVarSym(root,
                            `${root.funcId ? root.funcId.orig : ""}_v`)
    closRefSym.closureObj = true
    State.allUniqFields(root.refVars)
    for(const i of refVars) {
      i.closRefSym = closRefSym
    }
  }
  return s
}

const emptyMap = new Map()
const emptySet = new Set()

/**
 * emplaces closure capturing object definitions 
 * to store reference variables between scopes
 */
export function* injectStateRefs(si) {
  const s = Kit.auto(si)
  const root = s.first.value
  if (!root.closure) {
    yield* s
    return
  }
  const {closRefSym} = root
  const decls = root.savedDecls || (root.savedDecls = new Map())
  // TODO: 
  const deps = new Set()
  for(const i of root.scopeCapt)
    if (i.closRefSym)
      deps.add(i.closRefSym)
  const subst = new Map()
  for(const sym of deps) {
    const copy = Bind.tempVarSym(root,sym.orig,sym.byVal)
    subst.set(sym,copy)
    /* TODO: this extra assignment is needed just to make a symbol
     * to be local to the next function, i.e. internal representation
     * problem, could be some virtual assignment or scope related info
     * stored in scope, not in symbol
     */
     decls.set(copy, {raw:null, init:[s.tok(Tag.init,Tag.Identifier,{sym})]})
  }
  yield* s.till(i => i.enter && i.pos == Tag.body && i.type === Tag.Array)
  if (closRefSym)
    decls.set(closRefSym,{raw:null,init:[...function*(){
      const lab = s.label()
      yield s.enter(Tag.init, Tag.ObjectExpression)
      yield s.enter(Tag.properties, Tag.Array)
      const names = new Set()
      for(const sym of root.refVars) {
        yield s.enter(Tag.push, Tag.ObjectProperty,
                      {node:{shorthand:sym.param != null}})
      assert.ok(sym.fieldName)
        yield s.tok(Tag.key,Tag.Identifier,{node:{name:sym.fieldName}})
        let decl
        // check if it already has value
        const copy = sym.param || (decl = decls.get(sym)) && decl.init
        yield s.tok(Tag.value,Tag.Identifier,
                    {sym:copy /* !sym.track && sym.unordered */
                     ? sym
                     : Kit.scope.undefinedSym})
        yield* s.leave()
      }
      yield* lab()
    }()],kind:"const"})
  for(const i of s) {
    if (i.enter) {
      switch(i.type) {
      case Tag.Identifier:
        const {sym} = i.value
        if (!i.value.decl && sym && sym.closRefSym) {
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
      }
    }
    yield i
  }
}


