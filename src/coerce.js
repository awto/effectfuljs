import * as R from "ramda"
import * as Kit from "./kit"
import * as assert from "assert"
import {Tag,symbol} from "estransducers"
import * as Block from "./block"
import * as Branch from "./branch"
import {recalcEff} from "./propagate"

export const expr = symbol("coerceExpr","ctrl")
export const block = symbol("coerceBlock","ctrl")

/**
 * if there is no coercing pure statement blocks must be turned into effectful
 */
export const lift = R.pipe(
//  Branch.liftCoerce,
  function lift(s) {
    const sl = Kit.auto(s)
    function* pure() {
      yield sl.enter(Tag.push,Tag.ExpressionStatement)
      yield sl.tok(Tag.expression,Block.pure,{bind:true})
      yield* sl.leave()
    }
    function* convert() {
      yield* sl.peelTo(Tag.body)
      yield* walk()
      yield* pure()
      yield* sl.leave()
    }
    function* walk() {
      for(const i of sl.sub()) {
        yield i
        if (i.enter && i.value.eff) {
          let alt = false
          switch(i.type) {
          case Tag.IfStatement:
            for(const j of sl.sub()) {
              yield j
              if (j.enter) {
                switch(j.pos) {
                case Tag.alternate:
                  assert.ok(j.type === Tag.BlockStatement)
                  alt = true
                case Tag.consequent:
                  yield* j.value.eff || sl.opts.coerce !== false
                    ? walk() : convert()
                }
              }
            }
            if (!alt && sl.opts.coerce === false) {
              const lab = sl.label()
              yield sl.enter(Tag.alternate,Tag.BlockStatement)
              yield sl.enter(Tag.body,Tag.Array)
              yield* pure()
              yield* lab()
            }
            break
          case Tag.TryStatement:
            for(const j of sl.sub()) {
              yield j
              if (j.enter) {
                switch(j.pos) {
                case Tag.block:
                case Tag.finalizer:
                case Tag.body:
                  assert.equal(j.type,Tag.BlockStatement)
                  yield* j.value.eff || sl.opts.coerce !== false
                    ? walk() : convert()
                }
              }
            }
            
          }
        }
      }
    }
    return walk()
  },
  recalcEff
)

export function* liftFuncs(s) {
  s = Kit.auto(s)
  if (s.first.value.topEff
      || s.opts.coerce !== false
      || !s.first.value.func
     )
  {
    yield* s
    return
  }
  s.first.value.topEff = true
  let hasLast = null
  const lab = s.label()
  for(const i of s) {
    yield i
    if (i.type === Tag.Array && i.pos === Tag.body)
      break
  }
  for(const i of s.sub()) {
    yield i
    if (i.enter) {
      switch(i.type) {
      case Tag.ReturnStatement:
        yield s.enter(Tag.argument,Block.pure)
        yield* s.sub()
        yield* s.leave()
        hasLast = hasLast || i.value.last
        break
      }
    }
  }
  if (!hasLast) {
    yield s.enter(Tag.push,Tag.ReturnStatement)
    yield s.tok(Tag.argument,Block.pure)
    yield* s.leave()
  }
  yield* lab()
  yield* s
}

export function inject(s) {
  const sl = Kit.auto(s)
  function* walk(sw) {
    for(const i of sw) {
      yield i
      if (i.enter && i.type === Block.app && sl.opts.coerce === true) {
        yield sl.enter(i.pos,expr)
        yield* walk(sl.one())
        yield* sl.leave()
        continue
      }
    }
  }
  return walk(sl)
}

export const interpret = R.pipe(function interpret(s) {
  const sl = Kit.auto(s)
  function* walk() {
    for(const i of sl.sub()) {
        switch(i.type) {
        case expr:
          if (i.enter) {
            const j = sl.curLev()
            if (!j)
              continue
            switch(j.type) {
            case Block.effExpr:
              yield sl.enter(i.pos,Kit.Subst)
              yield* walk()
              yield* sl.leave()
              continue
            }
            const lab = sl.label()
            yield sl.enter(i.pos,Block.effExpr)
            yield sl.enter(Tag.expression,Tag.CallExpression)
            yield* Kit.packId(sl,Tag.callee)
            yield sl.enter(Tag.arguments,Tag.Array)
            // TODO: it is likely already push
            yield sl.enter(Tag.push,Kit.Subst)
            yield* walk()
            yield* lab()
          }
          continue
        }
      yield i
    }
  }
  return walk()
},Kit.completeSubst)

