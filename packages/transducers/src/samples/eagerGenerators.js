import {produce,consume,Tag,symbol} from "../core"
import * as Kit from "../kit"
import * as T from "@babel/types"
import * as Trace from "../trace"

const SpecVars = symbol("SpecVars","ctrl")

const specNames = {
  arguments: true
}

export default Kit.pipe(
  Kit.wrap("eager-generators-transform",function* transform(s) {
    function* make(i) {
      i.value.node.generator = false
      const lab = s.label()
      yield* s.peelTo(Tag.body)
      yield* s.peelTo(Tag.body)
      const specVars = {}
      yield s.tok(Tag.push,SpecVars,{node:specVars})
      yield s.enter(Tag.push,Tag.ReturnStatement)
      yield s.enter(Tag.argument,Tag.CallExpression)
      yield s.tok(Tag.callee,T.identifier("e$y$make"))
      yield s.enter(Tag.arguments,Tag.Array)
      yield s.enter(Tag.push,
                    Tag.ArrowFunctionExpression,
                    {node:
                     {id: {type: "Identifier",
                           name: i.value.node.id != null
                           ? `${i.value.node.id.name}Impl`
                           : "EagerGen"},
                      params:[{type:"Identifier",name:"e$y$buf"}]}})
      yield s.enter(Tag.body,Tag.BlockStatement)
      yield s.enter(Tag.body,Tag.Array)
      yield* walk(specVars)
      yield* lab()
    }
    function* walk(specVars) {
      for(const i of s.sub()) {
        switch(i.type) {
        case Tag.YieldExpression:
          if (i.enter) {
            const lab = s.label()
            yield s.enter(i.pos,Tag.CallExpression)
            yield s.tok(Tag.callee,
                        T.identifier(i.value.node.delegate ? "e$y$star" : "e$y"))
            yield s.enter(Tag.arguments,Tag.Array)
            yield s.tok(Tag.push,T.identifier("e$y$buf"))
            yield s.enter(Tag.push,Kit.Subst)
            yield* walk(specVars)
            yield* lab()
          }
          continue
        case Tag.Identifier:
          if (specVars != null && specNames[i.value.node.name]) {
            specVars[i.value.node.name] = true
            if (i.enter)
              //TODO: unique names
              yield s.tok(i.pos,T.identifier(`e$y$${i.value.node.name}`))
            continue
          }
        case Tag.FunctionExpression:
        case Tag.ArrowFunctionExpression:
        case Tag.FunctionDeclaration:
          if (i.enter && i.value.node.generator) {
            yield i
            yield* make(i)
            continue
          }
        }
        yield i
      }
    }
    for(const i of s) {
      yield i
      switch(i.type) {
      case Tag.Class:
      case Tag.ClassBody:
      case Tag.ClassMethod:
      case Tag.FunctionExpression:
      case Tag.ArrowFunctionExpression:
      case Tag.FunctionDeclaration:
        if (i.enter) {
          if (!i.value.node.generator)
            break
          if (Kit.hasAnnot(i.value.node,"@LAZY")) {
            yield* s.sub()
            break
          }
          yield* make(i)
        }
      }
    }
  }),
  Array.from,
  function* completeSpecVars(si) {
    const s = Kit.auto(si)
    for(const i of s) {
      if (i.type === SpecVars) {
        const lab = s.label()
        const k = Object.keys(i.value.node)
        if (k.length) {
          yield s.enter(i.pos,Tag.VariableDeclaration,{node:{kind:"var"}})
          yield s.enter(Tag.declarations, Tag.Array)
          for(const j of k) {
            yield s.enter(Tag.push,Tag.VariableDeclarator)
            yield s.tok(Tag.id,T.identifier(`e$y$${j}`))
            yield s.tok(Tag.init,T.identifier(j))
            yield* s.leave()
          }
          yield* lab()
        }
      } else
        yield i
    }
  },
  Kit.completeSubst)

