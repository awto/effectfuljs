import * as R from "ramda"
import * as assert from "assert"
import generate from "babel-generator"
import {parse} from "babylon"
import {Tag,produce,consume} from "estransducers"
import * as Trace from "estransducers/trace"
import * as Kit from "../../src/kit"
import * as Transform from "../../src/transform"
import * as Control from "../../src/control"
import * as Prop from "../../src/propagate"
import defaultOpts from "../../src/config"

export function pretty(f) {
  return prettyBlock(`(${f.toString()});`)
}

export const print = pretty

export function prettyBlock(f,opts = {}) {
  const ast = parse(f.toString(),opts.parser || {sourceType:"module"})
  const orig = R.pipe(produce,Kit.strip)(ast)
  consume(orig)
  return generate(ast,{quotes:"single",retainFunctionParens:true},"").code
}

export const runExpr = R.curry(function(opts, f) {
  return run(opts, `(${f.toString()});`)
})

export const run = R.curryN(2,Kit.optsScopeLift(function run(opts,f) {
  Kit.setOpts(Object.assign({},
                            defaultOpts,
                            {require:"@effectfuljs/core",ns:"M",override:opts},
                            opts))
  const ast = parse(f.toString(),opts.parser || {sourceType:"module"})
  const orig = R.pipe(produce,Array.from)(ast)
  Transform.run(orig)
  return prettyBlock(
    generate(ast,
             {quotes:"single",retainFunctionParens:true,concise:true},"")
      .code,
    opts)
}))

export const isQUnit = typeof QUnit !== "undefined";

const testDefaultOpts = {coerce:true,
                         state:true,
                         closure:true,
                         profile:"full",
                         assoc:"l"}

export function exprEqual(l, r, opts = testDefaultOpts) {
  return blockEqual(`(${l});`, `(${r});`, opts)
}

export function blockEqual(l, r, opts = testDefaultOpts) {
  return equal(run(opts,l), prettyBlock(r,opts), "same semantics")
};

export const equal = isQUnit ? function equal(l, r, d) {
  return expect(l).to.equal(r, d)
} : function equal(l, r, d) {
  return assert.equal(l, r)
}

export function exprSame(l, r) {
  return it("should not change semantics", function() {
    return exprEqual(l, r)
  })
}

export function blockSame(l, r) {
  return it("should not change semantics", function() {
    return exprEqual(l, r)
  })
}

export const transformBlock = R.curryN(2,Kit.optsScopeLift(
  function(fun,src,opts = testDefaultOpts) {
    Kit.setOpts(Object.assign({},
                              defaultOpts,
                              {require:"@effectfuljs/core",ns:"M",override:opts},
                              opts))
    const ast = parse(src.toString(),{sourceType:"module"})
    const s = R.pipe(produce,Array.from,Transform.scopes)(ast)
    const prep = R.pipe(
        Control.assignLabels,
        Prop.assignEff,
        Array.from,
        Prop.propagateEff,
        Array.from,
        fun
      )
    for (const i of s)
      prep(i)
    return prettyBlock(
      generate(ast,
               {quotes:"single",retainFunctionParens:true,concise:true},
               "").code)
  }))

export const transformExpr
  = R.curryN(2, (fun,src,opts = testDefaultOpts) => transformBlock(fun,`(${src});`,opts))

export function* prepareScopes(s) {
  for (const i of Transform.scopes(s)) {
    yield R.pipe(
      Control.assignLabels,
      Prop.assignEff,
      Array.from,
      Prop.propagateEff,
      Array.from
    )(i)
  }
}
