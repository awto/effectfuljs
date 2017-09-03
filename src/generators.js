import * as Kit from "./kit"
import {Tag} from "./kit"
import * as assert from "assert"
import {scope,jump} from "./control"
import * as Debug from "./debug"

export function* prepare(si) {
  const s = Kit.auto(si)
  const root = s.first.value
  root.node.generator = false
  root.node.async = false
  if (root.coerce == null)
    root.coerce = false
  for(const i of s) {
    if (i.enter) {
      switch(i.type) {
      case Tag.ForOfStatement:
        if (!i.value.node.async && s.opts.pureForOf)
          break
      case Tag.AwaitExpression:
      case Tag.YieldExpression:
        i.value.bind = true
        if (!s.curLev()) {
          yield s.peel(i)
          yield s.tok(Tag.argument,Tag.Identifier,{sym:Kit.scope.undefinedSym})
          yield* s.leave()
          continue           
        }
        break
      case Tag.ForAwaitStatement:
        i.value.bind = true
        break
      }
    }
    yield i
  }
}
