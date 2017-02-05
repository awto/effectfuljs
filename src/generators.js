import * as R from "ramda"
import * as Kit from "./kit"
import {Tag} from "./kit"
import * as assert from "assert"
import {scope,jump} from "./control"
import * as Debug from "./debug"

export const yieldExpr = Kit.symbol("yieldExpr")

export function* assignLabels(si) {
  const s = Kit.auto(si)
  const top = s.first
  assert.equal(top.pos,Tag.top)
  if (!top.value.node.generator) {
    yield* s
    return
  }
  top.value.node.generator = false
  for(const i of s) {
    if (i.enter && i.value.ctrl != null) {
      i.value.ctrl.push("#yld","#yldS")
      i.value.ctrlName = "generator"
      yield i
      break
    }
    yield i
  }
  for(const i of s) {
    if (i.enter && i.type === Tag.YieldExpression) {
      i.value.jump = i.value.node.delegate ? "#yldS" : "#yld" 
      i.value.exit = false
      i.value.jumpKind = "gen"
    }
    yield i
  }
}

/**
 * if we use generators only to specify bind points
 */
const removeImpl = R.pipe(
  function remove(si) {
    const top = si.first
    assert.equal(top.pos,Tag.top)
    function* walk() {
      for(const i of si.sub()) {
        if (i.type === Tag.YieldExpression) {
          if (i.enter) {
            const t = si.curLev()
            if (t != null) {
              t.value.bind = true
              yield si.enter(i.pos,Kit.Subst)
              yield* walk()
              yield* si.leave()
            } //TODO: maybe return pure?
          }
          continue
        }
        if (i.enter && i.value.ctrlName === "generator") {
          i.value.ctrlName = null
          i.value.ctrl = ["#ret"]
        }
        yield i
      }
    }
    return walk()
  },
  Kit.completeSubst)

export function remove(s) {
  const si = Kit.auto(s)
  return si.opts.generatorDo ? removeImpl(si) : si
}

export function* assignEff(s) {
  for(const i of s) {
    if (i.enter && i.type === Tag.YieldExpression)
      i.value.bind = true
    yield i
  }
}

const prepareImpl = R.pipe(
  assignLabels,
  assignEff)

export function prepare(s) {
  const si = Kit.auto(s)
  if (!si.opts.generator)
    return si
  return prepareImpl(si)
}

