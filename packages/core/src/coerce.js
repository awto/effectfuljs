import * as Kit from "./kit"
import * as assert from "assert"
import {Tag,symbol} from "./kit"
import * as Block from "./block"
import * as Branch from "./branch"
import * as Ctrl from "./control"

export const expr = symbol("coerceExpr","ctrl")
export const block = symbol("coerceBlock","ctrl")

export const coerceSym = Kit.sysId("coerce")
export const coerceSymNs = Kit.sysId("coerceNS")
coerceSymNs.nsDefault = true

/**
 * if there is no coercing pure statement blocks must be turned into effectful
 */
export function lift(s) {
  const sl = Kit.auto(s)
  const coerce = false // sl.opts.coerce
  function* walk() {
    for(const i of sl.sub()) {
      yield i
      if (i.enter && i.value.eff) {
        let alt = false
        switch(i.type) {
        case Tag.IfStatement:
          if (!i.value.eff) {
            yield* s.sub()
            break
          }
          yield* sl.one()
          for(const j of sl.sub()) {
            yield j
            if (j.enter) {
              j.value.eff = true
              yield* walk()
            }
          }
          break
        case Tag.SwitchStatement:
          // in switch each branch either ends in break or next branch
          // so it is enough to lift only the last one
          if (!i.value.eff) {
            yield* s.sub()
            break
            }
          yield* sl.one()
          yield sl.peel()
          const lab = sl.label()
          for(const j of sl.sub()) {
            yield sl.peel(j)
            if (sl.cur().pos === Tag.test) {
              yield* sl.one()
              yield sl.peel()
              yield* walk()
            } else {
              yield sl.peel()
              const k = sl.peel()
              assert.equal(k.type,Tag.BlockStatement)
              k.value.eff = true
              yield k
              yield* walk()
            }
            yield* lab()
          }
          yield* sl.leave()
          break
        case Tag.TryStatement:
          if (!i.value.eff) {
            yield* s.sub()
            break
          }
          for(const j of sl.sub()) {
            yield j
            if (j.enter) {
              switch(j.pos) {
              case Tag.block:
              case Tag.finalizer:
              case Tag.body:
                assert.equal(j.type,Tag.BlockStatement)
                j.value.eff = true
                yield* walk()
              }
            }
          }
        }
      }
    }
  }
  return walk()
}

export function inject(s) {
  const sl = Kit.auto(s)
  const coerce = sl.opts.coerce && !sl.opts.inlineCoerce
  if (!coerce)
    return sl
  return walk(sl)
  function* walk(sw) {
    for(const i of sw) {
      if (i.enter && i.type === Block.app) {
        if (i.value.static === false) {
          yield i
          yield sl.enter(i.pos,expr)
          yield* walk(sl.one())
          yield* sl.leave()
          continue
        }
        if (i.value.sym === Block.pureId) {
          if (sl.curLev()) {
            const inner = Kit.toArray(sl.sub())
            inner[0].value.result = true
            yield* inner
          }
          sl.close(i)
          continue
        }
      }
      yield i
    }
  }
}

export function interpret(s) {
  const sl = Kit.auto(s)
  if (!sl.opts.coerce)
    return sl
  function* _interpret() {
    for(const i of sl.sub()) {
        switch(i.type) {
        case expr:
          if (i.enter) {
            const j = sl.curLev()
            if (!j)
              continue
            switch(j.type) {
            case Block.effExpr:
              yield* Kit.reposOne(_interpret(),i.pos)
              continue
            }
            const lab = sl.label()
            yield sl.enter(i.pos,Block.effExpr)
            yield sl.enter(Tag.expression,Tag.CallExpression)
            yield sl.tok(Tag.callee,Tag.Identifier,{sym:coerceSymNs})
            yield sl.enter(Tag.arguments,Tag.Array)
            yield* Kit.reposOne(_interpret(),Tag.push)
            yield* lab()
          }
          continue
        }
      yield i
    }
  }
  return _interpret()
}
