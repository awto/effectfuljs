import * as R from "ramda"
import * as Kit from "../src/kit/core"
import {consumeScope} from "../src/transform"
import {Tag,produce,consume} from "estransducers"
import generate from "babel-generator"
import {parse} from "babylon"
import * as assert from "assert"
import {equal,print,transformExpr,runExpr} from "./kit/core"
import * as Prop from "../src/propagate"
import * as Trace from "../src/kit/trace"
import * as Block from "../src/block"
import * as Debug from "../src/debug"
import * as State from "../src/state"
import * as Uniq from "../src/uniq"
import * as Loops from "../src/loops"
import * as Ctrl from "../src/control"
import * as Branch from "../src/branch"
import * as Scope from "../src/scope"
import * as Gens from "../src/generators"


describe('generators interpretation', function() {
  const run = runExpr({ns:"M",
                       require:"@mfjs/generators"})
  it('should inject `generator` function for scope 1', function() {
    equal(
      run(function*() {
        yield 1;
        yield 2;
        yield* some();
        return (yield* some);
      }),
      print(function () {
        return M.generator(
          (ret, yld, yldS) =>
            yld(1).mbind(
              () => yld(2)).mbind(
                () => {
                  var a = some();
                  return yldS(a);
                }).mbind(() => yldS(some)));
      }))
  })
  context("with removed generators", function() {
    const run = runExpr({ns:"M",
                         require:"@mfjs/generators",
                         generatorDo:true})
    it('should treat yield as bind points only', function() {
      equal(
        run(function*() {
          return (yield ((yield a1) + (yield a3)));
        }),
        print(function () {
          return a1.mbind(a => a3.mbind(b => a + b));
        }))
    })
  })
})
