import * as R from "ramda"
import {Tag} from "estransducers"
import {tok,Subst} from "./core"


export function* openVarDecl(idNode,s) {
  yield s.enter(Tag.init,Tag.VariableDeclaration,{node:{kind:"var"}})
  yield s.enter(Tag.declarations,Tag.Array)
  yield s.enter(Tag.push,Tag.VariableDeclarator)
  yield tok(Tag.id,{node:idNode})
}

export function* openBlock(pos,s) {
  yield s.enter(pos,Tag.BlockStatement)
  yield s.enter(Tag.push,Tag.Array)
}

export function* peelBlockFrom(s) {
  const i = s.cur()
  if (i != null && i.type === Tag.BlockStatement) {
    yield s.peel()
    yield* s.peelTo(Tag.body)
  } else {
    yield s.enter(i.pos, Tag.BlockStatement)
    yield s.enter(Tag.body, Tag.Array)
    yield s.enter(Tag.push, Subst)
  }
}
