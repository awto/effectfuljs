import * as R from "ramda"
import * as Kit from "./kit"
import {Tag} from "./kit"
import * as assert from "assert"
import {scope,jump} from "./control"
import * as Debug from "./debug"

export function assignEff(si) {
  const s = Kit.auto(si)
  s.first.value.node.generator = false
  s.first.value.node.async = false
  function* walk() {
    for(const i of s.sub()) {
      if (i.enter) {
        switch(i.type) {
        case Tag.AwaitExpression:
        case Tag.YieldExpression:
          yield* Kit.reposOne(walk(), i.pos)
          s.close(i)
          i.value.bind = true
          continue
        }
      }
      yield i
    }
  }
  return walk()
}

export const prepare = R.pipe(assignEff)

