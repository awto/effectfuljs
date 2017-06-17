import * as R from "ramda"
import * as Kit from "./"
import * as assert from "assert"
import {Tag,symbol} from "estransducers"

/** turns statement into an expression */
export const stmtExpr = symbol("stmtExpr","ctrl")

function* normilizePass(s) {
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
