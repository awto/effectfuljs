import * as Kit from "./kit"
import {Tag,symbol,invariant} from "./kit"
import * as Block from "./block"
import * as Branch from "./branch"
import * as Ctrl from "./control"

export const expr = symbol("coerceExpr","ctrl")
export const block = symbol("coerceBlock","ctrl")

export const coerceSym = Kit.sysId("coerce")
export const coerceJsxSym = Kit.sysId("el")
export const coerceJsxManySym = Kit.sysId("els")
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
              invariant(k.type === Tag.BlockStatement)
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
                invariant(j.type === Tag.BlockStatement)
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

export function cleanPureJumps(si) {
  const s = Kit.auto(si)
  if (!s.opts.coerce)
    return s
  const {pureExitFrame} = s.first.value
  return _cleanPureJumps()
  function* _skip(i) {
    yield s.enter(i.pos,Block.effExpr,i.value)
    if (s.curLev()) {
      yield* Kit.reposOne(s.one(),i.pos)
    }
    if (!i.leave)
      Kit.skip(s.copy(i))
    yield* s.leave()
  }
  function* _cleanPureJumps() {
    for(const i of s) {
      if (i.enter) {
        switch(i.type) {
        case Block.app:
          if (i.value.sym === Block.pureId) {
            yield* _skip(i)
            continue
          }
          break
        case Block.letStmt:
        case Ctrl.jump:
          if (i.value.goto === pureExitFrame) {
            yield* _skip(i)
            continue
          }
          break
        }
      }
      yield i
    }
  }
}

/**
 * Wraps each react element with specified in `opSym`/`bindName` operation
 */
export function jsx(si) {
  const s = Kit.auto(si)
  if (!s.opts.jsxCoerce)
    return s
  return _jsxCoerce(false)
  function* _emitCoerce(i, jsx, pos = i.pos, sym = coerceJsxSym) {
    if (jsx) {
      yield s.enter(pos,Tag.JSXExpressionContainer)
      pos = Tag.expression
    }
    yield s.enter(pos,Tag.CallExpression,{bind:true})
    yield s.tok(Tag.callee,Tag.Identifier,{sym})
    yield s.enter(Tag.arguments, Tag.Array)
  }
  function* _jsxCoerce(jsx) {
    for(const i of s.sub()) {
      if (i.enter) {
        switch(i.type) {
        case Tag.JSXSpreadChild:
          yield i
          const slab = s.label()
          yield* _emitCoerce(i, false, Tag.expression, coerceJsxManySym)
          yield* Kit.reposOne(_jsxCoerce(false),Tag.push)
          yield* slab()
          continue
        case Tag.JSXExpressionContainer:
          yield i
          if (i.pos === Tag.push) {
            const lab = s.label()
            yield* _emitCoerce(i, false, Tag.expression)
            yield* Kit.reposOne(_jsxCoerce(false),Tag.push)
            yield* lab()
            continue
          }
          yield* _jsxCoerce(false)
          continue
        case Tag.JSXElement:
          const lab = s.label()
          const {name} = i.value.node.openingElement
          if (name.type === "JSXMemberExpression"
              || name.type === "JSXIdentifier"
              && name.name[0].toUpperCase() === name.name[0]) {
            yield* _emitCoerce(i, jsx)
            yield s.peel(Kit.setPos(i,Tag.push))
            yield* _jsxCoerce(true)
            yield* lab()
            continue
          }
          yield i
          yield* _jsxCoerce(true)
          continue
        case Tag.JSXFragment:
        case Tag.JSX:
          yield i
          yield* _jsxCoerce(true)
          continue
        }
      }
      yield i
    }
  }
}

