import * as T from "babel-types"
import * as assert from "assert"
import * as Kit from "./kit"
import {Tag,produce,consume,enter,leave,tok,varScope} from "./kit"
import * as Loops from "./loops"
import * as State from "./state"
import * as Control from "./control"
import * as Scope from "./scope"
import * as Block from "./block"
import * as Bind from "./bind"
import * as Prop from "./propagate"
import * as Branch from "./branch"
import * as Exceptions from "./exceptions"
import * as Coerce from "./coerce"
import * as Policy from "./policy"
import * as Placeholder from "./placeholder"
import * as Gens from "./generators"
import * as Rt from "./rt"
import * as Ops from "./ops"
import * as Flat from "./flat"
import * as Closure from "./closure"
import simplify from "./simplify"
import {ifLoose,ifEsRebind,ifTopLevel,
        ifJsExceptions,ifGenerators} from "./options"

export const consumeScope = consume

export const preproc = Kit.pipe(
  Kit.prepare,
  Kit.scope.prepare,
  Prop.prepare,
  Policy.prepare,
  State.prepare)

export const scopes = Kit.pipe(
  preproc,
  Scope.splitScopes)

const finalize = Kit.pipe(
  State.locals,
  Block.interpretLibSyms,
  Closure.depsToTop,
  varScope.resolve,
  consume)

/* default transform for all functions if loose mode is set */
export const loose = Kit.pipe(Loops.looseForOf)

const ifEff = Kit.curry(function ifEff(others, alt, si) {
  const s = Kit.auto(si)
  return (s.first.value.topEff ? others(s) : alt(s))
})

export const normilizeOnly = Kit.pipe(
  ifTopLevel(Kit.pipe(
    State.saveDecls,
    Loops.toBlocks,
    Closure.injectStateRefs
  )),
  ifLoose(loose),
  Branch.clean,
  State.restoreDecls,
  simplify)

/**
 * passes in required order depending on options specified
 */
export const all =
  Kit.pipe(
    Policy.stage("match"),
    ifEsRebind(
      Gens.prepare,
      Kit.pipe(
        Policy.unwrapNs,
        Policy.assignBindCalls)),
    ifJsExceptions(s => s, Policy.assignThrowEff),
    Policy.stage("propagate"),
    Control.assignLabels,
    Ops.inject,
    Prop.propagateEff,
    Policy.stage("normilize"),
    ifEff(Kit.pipe(
      Control.removeLabeldStatement,
      Loops.toBlocks,
      Branch.toBlocks,
      Loops.forOfStmt,
      Loops.doWhileStmt,
      Prop.recalcEff,
      Loops.normilizeFor,
      Closure.declToExpr,
      State.saveDecls,
      Closure.injectStateRefs,
      Coerce.lift,
      Branch.liftSwitchCoerce,
      Prop.recalcEff,
      Control.injectBlock,
      Loops.injectRepeat,
      Prop.recalcEff,
      Policy.stage("orginize"),
      Branch.prepareLogical,Prop.recalcEff,
      Bind.flatten,
      Policy.stage("inject"),
      Exceptions.inject,Prop.recalcEff,
      Block.splitEffBlock,
      Control.recalc,
      Flat.convert,
      Ops.combine,
      ifEsRebind(Gens.clean),
      Block.cleanPureEff,
      Policy.stage("interpret"),
      Ops.interpret,
      Flat.interpret,
      Block.interpretApp,
      Coerce.interpret,
      Block.interpretCasts,
      Branch.clean,
      State.restoreDecls
    ),normilizeOnly),
    simplify)

export const defaultTransform = all
export const defaultGensTransform = all

/**
 * entry point for the whole translator chain
 */
export function run(s) {
  let inject = new Map()
  let any = false
  const transformMap = new Map()
  const inp = [...scopes(s)]
  let scopeNum = 0
  const len = inp.length
  for(let x = 0; x < len; ++x) {
    const i = inp[x]
    const {value} = i[0]
    value.scopeNum = scopeNum++
    const f = value.opts
    if (f != null && f.transform) {
      if (f.inject && f.require)
        inject.set(f.$ns,f.require)
      any = true
    }
    if (f.transform)
      Kit.mapPush(transformMap, f.transform, x)
  }
  if (!transformMap.size)
    return;
  const root = inp[inp.length-1][0].value
  if (root.opts.topLevel) {
    for(let x = 0; x < len; ++x) {
      const i = inp[x]
      const capt = Closure.calcStateRefs(i)
      if (!i[0].value.opts.transform) {
        if (capt) {
          Kit.mapPush(transformMap, normilizeOnly, x)
        } else if (i[0].value.opts.loose) {
          Kit.mapPush(transformMap, loose, x)
        }
      }
    }
  }
  for(const [t,xs] of transformMap) {
    for(const x of xs)
      inp[x] = Kit.toArray(t(inp[x]))
  }
  let res = [...Scope.restore(root,inp)]
  if (inject.size) {
    const namespaces = res[0].value.namespaces || new Map()
    const toInject = []
    for(const [ns,mod] of inject) {
      const imported = namespaces.get(mod)
      if (!imported || ns !== imported)
        toInject.push([ns,mod])
    }
    res = Rt.inject(toInject,res)
  }
  finalize(res)
}

export function main(ast,opts = {}) {
  return Kit.optsScope(function main(f) {
    Kit.setOpts(opts)
    run(Kit.produce(ast))
    return ast
  })
}

export function babelPreset(opts = {}) {
  return {
    plugins: [
      function (t) {
        return {
          visitor:{
            Program(path,state) {
              path.skip()
              return Kit.optsScope(function babelPreset(f) {
                Kit.setOpts(opts)
                Kit.babelBridge(run,path,state)
              })
            }
          }
        }
      }
    ]
  }
}

export function applyPass(ast,pass,opts = {}) {
  return Kit.optsScope(function applyPass(f) {
    Kit.setOpts(opts)
    Kit.skip(pass(Kit.produce(ast)))
    return ast
  })
}

export default main
