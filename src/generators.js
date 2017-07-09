import * as R from "ramda"
import * as Kit from "./kit"
import {Tag} from "./kit"
import * as assert from "assert"
import {scope,jump} from "./control"
import * as Debug from "./debug"

export function* prepare(si) {
  const s = Kit.auto(si)
  s.first.value.node.generator = false
  s.first.value.node.async = false
  for(const i of s) {
    if (i.enter) {
      switch(i.type) {
      case Tag.ForOfStatement:
        if (!i.value.node.async && s.opts.pureForOf)
          break
      case Tag.ForAwaitStatement:
      case Tag.AwaitExpression:
      case Tag.YieldExpression:
        i.value.bind = true
        break
      }
    }
    yield i
  }
}

export function clean(si) {
  const s = Kit.auto(si)
  function* walk() {
    for(const i of s.sub()) {
      if (i.enter && i.type === Tag.AwaitExpression) {
        yield* Kit.reposOne(walk(),i.pos)
        s.close(i)
      } else
        yield i
    }
  }
  return walk()
}

