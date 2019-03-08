/**
 * A few simple es6 to es5 conversions. They are not ES6 fully standard conforming, 
 * and to be used only as a postprocessing of other transform, using ES6 syntax
 * for simplification. They change synthesized nodes.
 */
import * as Kit from "./kit"
import {Tag,symInfo,symbol} from "./core"
import * as Trace from "./trace"
import * as Scope from "./scope"

/** is to be converted into variable declaration if its `sym` is ever used */
export const tempAssign = newSym("tempAssign")

function isSynth(value) {
}

/**
 * if generated function uses `arguments` variable it will be aliased 
 * to the closest not-generated function's ancestor  
 */
export function resolveArgumentsVar() {
  const s = Kit.auto(si)
}

export function downArrowFunctions(si) {
  const s = Kit.auto(si)
  function* walk(sw, curThis) {
    for(const i of s.sub()) {
      if (i.enter) {
        if (symInfo(i.type).func && !i.leave) {
          if (i.type === Tag.ArrowFunctionExpression && isSynth(i.value)) {
            const lab = s.label() 
            yield s.enter(i.pos, Tag.FunctionExpression, i.value)
            let j = s.curLev()
            if (j && j.pos === Tag.params) {
              // expecting no default args in syn fun
              yield* s.one()
              j = s.curLev()
            }
            if (j && j.pos === Tag.body) {
              if (symInfo(j.type).expr) {
                yield s.enter(Tag.body, Tag.BlockStatement)
                yield s.enter(Tag.body, Tag.Array)
                yield s.enter(Tag.push, Tag.ReturnStatement)
                yield* Kit.reposOne(walk(s.one(), curThis), Tag.argument)
              } else
                yield* walk(s.one(), curThis)
            }
            yield* lab()
            s.close(i)
            continue
          }
          yield i
          for(const j of s.sub()) {
            yield j
            if (j.enter) {
              switch(j.pos) {
              case Tag.params:
                yield* walk(s.sub(), curThis)
                break
              case Tag.body:
                yield s.take()
                const sym = Scope.newSym("t")
                yield s.enter(Tag.push, tempAssign, {sym})
                yield s.tok(Tag.init, Tag.ThisExpression)
                yield* s.leave()
                yield* walk(sym)
                yield* s.tillClose(i)
                break
              }
            }
          }
          continue
        }
        if (i.type === Tag.ThisExpression) {
          yield s.tok(i.pos, Tag.Identifier, {sym:curThis})
          s.close(i)
          continue
        }
      }
      yield i
    }
  }
  return walk()
}




