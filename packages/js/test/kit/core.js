import * as assert from "assert"
import generate from "babel-generator"
import {parse} from "babylon"
import {Tag,consume} from "estransducers"
import * as Trace from "estransducers/trace"
import * as Kit from "../../src/kit"
import * as Transform from "../../src/transform"
import * as Scope from "../../src/scope"
import * as Control from "../../src/control"
import * as Branch from "../../src/branch"
import * as Prop from "../../src/propagate"
import * as Block from "../../src/block"
import * as Loops from "../../src/loops"
import defaultOpts from "../../src/config"

export function pretty(f) {
  return prettyBlock(`(${f.toString()});`)
}

export const print = pretty

const defaultParseOpts = {
  sourceType: "module",
  plugins: ["asyncGenerators",
            "doExpressions",
            "decorators",
            "functionBind",
            "functionSent"]
}

export function prettyBlock(f,opts = {}) {
  const ast = parse(f.toString(), opts.parser || defaultParseOpts)
  const orig = Kit.pipe(Kit.produce,Kit.strip)(ast)
  consume(orig)
  return generate(ast,{quotes:"single",retainFunctionParens:true},"").code
}

export const runExpr = Kit.curry(function(opts, f) {
  return run(opts, `(${f.toString()});`)
})

export const run = Kit.curryN(2,Kit.optsScopeLift(function run(opts,f) {
  Kit.setOpts(Object.assign({},
                            defaultOpts,
                            {preset:"@effectful/core",
                             ns:"M",override:opts},
                            opts))
  const ast = parse(f.toString(),opts.parser || defaultParseOpts)
  const orig = Kit.pipe(Kit.produce,Array.from)(ast)
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
                         profile:"full"}

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

export const transformBlock = Kit.curryN(2,Kit.optsScopeLift(
  function(fun,src,opts = testDefaultOpts) {
    Kit.setOpts(Object.assign({},
                              defaultOpts,
                              {preset:"@effectful/core",
                               ns:"M",
                               override:opts},
                              opts))
    const ast = parse(src.toString(),defaultParseOpts)
    const s = Kit.pipe(Kit.produce,Array.from,scopes)(ast)
    for (const i of s)
      fun(i)
    return prettyBlock(
      generate(ast,
               {quotes:"single",retainFunctionParens:true,concise:true},
               "").code)
  }))

export const transformExpr
  = Kit.curryN(2, (fun,src,opts = testDefaultOpts) => transformBlock(fun,`(${src});`,opts))

const scopes = Kit.pipe(
  Transform.preproc,
  Scope.splitScopes,
  Kit.map(Kit.pipe(Branch.toBlocks,Prop.recalcEff,Kit.toArray)),
  Control.injectBlock,
  Kit.map(Kit.pipe(Kit.toArray)),
  Array.from
)

export function restore(si) {
  const s = Kit.auto(si)
  function* walk() {
    for(const i of s.sub()) {
      if (i.enter) {
        switch(i.type) {
        case Loops.repeat:
          yield s.peel(Kit.setType(i,Tag.ForStatement))
          yield* Kit.reposOne(walk(),Tag.body)
          yield* s.leave()
          continue
        case Block.chain:
          const lab = s.label()
          if (i.pos !== Tag.push) {
            yield s.enter(Kit.setType(i,Tag.BlockStatement,{bind:true}))
            yield s.enter(Tag.body,Tag.Array)
          }
          yield* walk()
          yield* lab()
          s.close(i)
          continue
        }
      }
      yield i
    }
  }
  return walk()
}
