import * as R from "ramda"
import * as Kit from "./"
import * as assert from "assert"
import {Tag,symbol} from "estransducers"

//turns statement into expression
export const stmtExpr = symbol("stmtExpr","ctrl")

//TODO: minimize could split up until expr seq etc
function* minimizeStmtExprPass(i) {
  const s = Kit.auto(i)
  yield* walk()
  function* walk() {
    for(const i of s.sub()) {
      if (i.type === stmtExpr) {
        if (i.enter)
          yield* body(i)
      } else {
        yield i
      }
    }
  }
  function* body(e) {
    const buf = [s.peel(e),s.peel(),...Array.from(s.peelTo(Tag.body))]
    assert.ok(buf[1].type === Tag.BlockStatement)
    const exprs = []
    for(const i of s.sub()) {
      switch(i.type) {
      case Tag.ExpressionStatement:
      case Tag.ReturnStatement:
        if (i.enter)
          exprs.push([Array.from(walk()),i])
        continue
      default:
        if (!Tag[i.type] && i.enter && i.leave) {
          buf.push(i)
          continue
        }
      }
      yield* buf
      for(const [j,t] of exprs) {
        yield s.enter(t)
        yield* j
        yield* s.leave()
      }
      yield s.peel(i)
      yield* s.sub()
      yield* s.leave()
      yield* walk()
      yield* s.leave()
      yield* s.leave()
      yield* s.leave()
      return false
    }
    assert.ok(exprs.length > 0)
    if (exprs.length === 1)  {
      yield s.enter(e.pos,Kit.Subst)
      yield* exprs[0][0]
      yield* s.leave()
    } else {
      yield s.enter(e.pos,Tag.SequenceExpression)
      yield s.enter(Tag.expressions,Tag.Array)
      for(const [i] of exprs) {
        yield s.enter(Tag.push,Kit.Subst)
        yield* i
        yield* s.leave()
      }
      yield* s.leave()
      yield* s.leave()
    }
    Kit.skip(s.leave())
    Kit.skip(s.leave())
    Kit.skip(s.leave())
  }
}

function* stmtExprNormilize(s) {
  const sl = Kit.auto(s)
  function* walk() {
    for(const i of sl.sub()) {
      if (i.type === stmtExpr) {
        if (i.enter) {
          yield sl.enter(i.pos,Tag.CallExpression)
          yield sl.enter(Tag.callee,Tag.FunctionExpression)
          yield* walk()
          yield* sl.leave()
          yield sl.enter(Tag.arguments,Tag.Array)
          yield* sl.leave()
          yield* sl.leave()
        }
      } else
        yield i
    }
  }
  yield* walk()
}

export const normilizePass = R.pipe(
  // minimizeStmtExprPass,
  // Kit.completeSubst,
  stmtExprNormilize
)

export function* clean(s) {
  
}
