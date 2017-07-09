import * as R from "ramda"
import * as T from "babel-types"
import * as assert from "assert"
import dump from "estransducers/dump"
import * as trace from "estransducers/trace"
import * as Kit from "./kit"
import {Tag,produce,consume,enter,leave,tok,varScope} from "./kit"
import * as Loops from "./loops"
import * as State from "./state"
import * as Control from "./control"
import * as Scope from "./scope"
import * as Block from "./block"
import * as Bind from "./bind"
import * as Prop from "./propagate"
import * as Uniq from "./uniq"
import * as Branch from "./branch"
import * as Exceptions from "./exceptions"
import * as Coerce from "./coerce"
import * as Policy from "./policy"
import * as Debug from "./debug"
import * as Placeholder from "./placeholder"
import * as Gens from "./generators"
import * as Rt from "./rt"
import * as Ops from "./ops"
import * as Flat from "./flat"
import * as Closure from "./closure"
import simplify from "./simplify"
import {ifEsRebind,ifTopLevel,ifJsExceptions,ifGenerators} from "./options"

export const consumeScope = consume

export const preproc = R.pipe(
  Kit.prepare,
  Kit.scope.prepare,
  Prop.prepare,
  Policy.prepare,
  State.prepare)

export const scopes = R.pipe(
  preproc,
  Scope.splitScopes)

const finalize = R.pipe(
  State.locals,
  Block.interpretLibSyms,
  Closure.depsToTop,
  varScope.resolve,
  consume)

const ifEff = R.curry(function ifEff(others, si) {
  const s = Kit.auto(si)
  return (s.first.value.topEff ? others(s) : s)
})

/**
 * passes in required order depending on options specified
 */
export const all =
  R.pipe(
    Kit.map(R.pipe(
      ifEsRebind(
        Gens.prepare,
        R.pipe(
          Policy.unwrapNs,
          Policy.assignBindCalls)),
      ifJsExceptions(s => s, Policy.assignThrowEff),
      Control.assignLabels,
      Ops.inject,
      Prop.propagateEff,
      Kit.toArray
    )),
    Kit.toArray,
    Kit.map(ifEff(R.pipe(
      Control.removeLabeldStatement,
      Loops.toBlocks,
      Branch.toBlocks,
      Loops.forOfStmt,
      Loops.doWhileStmt,
      Prop.recalcEff,
      Loops.normilizeFor,
      Coerce.lift,
      Branch.liftSwitchCoerce,
      ifTopLevel(Closure.declToExpr),
      State.saveDecls,
      Prop.recalcEff,
      Control.injectBlock,
      Loops.injectRepeat,
      Prop.recalcEff,
      ifTopLevel(Closure.calcStateRefs),
      Kit.toArray
    ))),
    Kit.toArray,
    Kit.map(ifEff(R.pipe(
      ifTopLevel(Closure.injectStateRefs),
      Branch.prepareLogical,Prop.recalcEff,
      Bind.flatten,
      Exceptions.inject,Prop.recalcEff,
      Block.splitEffBlock,
      Bind.calcVarDeps(null),
      Bind.threadDeps,
      Control.recalc,
      Flat.convert,
      Ops.combine,
      ifEsRebind(Gens.clean),
      Block.cleanPureEff,
      Ops.interpret,
      Flat.interpret,
      Block.interpretApp,
      Coerce.interpret,
      Block.interpretCasts,
      Branch.clean,
      State.restoreDecls,
      simplify))))

export const defaultTransform = all
export const defaultGensTransform = all

/**
 * entry point for the whole translator chain
 */
export function run(s) {
  let inject = new Map()
  let any = false
  const transformMap = new Map()
  const result = []
  const inp = [...scopes(s)]
  let scopeNum = 0
  const root = inp[inp.length-1][0].value
  for(const i of inp) {
    const {value} = i[0]
    value.scopeNum = scopeNum++
    const f = value.opts
    if (f != null && f.transform) {
      if (f.inject && f.require)
        inject.set(f.$ns,f.require)
      any = true
      Kit.mapPush(transformMap, f.transform, i)
    } else
      result.push(i)
  }
  if (!transformMap.size)
    return;
  for(const [t,i] of transformMap) {
    const v = Kit.toArray(t(i))
    for(const j of v)
      result.push(Kit.toArray(j))
  }
  let res = [...Scope.restore(root,result)]
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
