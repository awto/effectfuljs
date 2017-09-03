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
        ifJsExceptions} from "./options"

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
  Rt.interpretLibSyms,
  Closure.depsToTop,
  varScope.resolve,
  consume)

/* default transform for all functions if loose mode is set */
export const loose = Kit.pipe(Loops.looseForOf)

const ifEff = Kit.curry(function ifEff(others, alt, si) {
  const s = Kit.auto(si)
  return (s.first.value.topEff ? others(s) : alt(s))
})

export const normalizeOnly = Kit.pipe(
  ifTopLevel(Kit.pipe(
    Closure.saveDecls,
    Loops.toBlocks,
    State.saveDecls,
    Closure.injectStateRefs,
    Kit.toArray
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
        Policy.unwrapNs)),
    Policy.assignBindCalls,
    ifJsExceptions(s => s, Policy.assignThrowEff),
    Policy.stage("propagate"),
    Control.injectExplicitRet,
    Control.assignLabels,
    Ops.inject,
    Prop.propagateEff,
    Policy.stage("normalize"),
    ifEff(Kit.pipe(
      Control.removeLabeldStatement,
      Loops.toBlocks,
      Branch.toBlocks,
      Loops.whileStmt,
      Loops.forOfStmt,
      Loops.doWhileStmt,
      Prop.recalcEff,
      Loops.normalizeFor,
      Closure.saveDecls,
      State.saveDecls,
      Closure.injectStateRefs,
      Coerce.lift,
      Prop.recalcEff,
      Control.injectBlock,
      Loops.injectRepeat,
      Prop.recalcEff,
      Policy.stage("organize"),
      Branch.prepareLogical,
      Prop.recalcEff,
      Bind.flatten,
      Policy.stage("inject"),
      Exceptions.inject,Prop.recalcEff,
      Block.splitEffBlock,
      Control.recalc,
      Flat.convert,
      Ops.combine,
      Block.cleanPureEff,
      Policy.stage("interpret"),
      Ops.interpret,
      Flat.interpret,
      Block.interpretApp,
      Coerce.interpret,
      Block.interpretCasts,
      Branch.clean,
      State.restoreDecls,
      Rt.collect
    ),normalizeOnly),
    simplify)

export const defaultTransform = all
export const defaultGensTransform = all

/**
 * entry point for the whole translator chain
 */
export function run(s) {
  const transformMap = new Map()
  const sa = Kit.toArray(preproc(s))
  const inp = Kit.toArray(Scope.splitScopes(sa))
  let scopeNum = 0
  const len = inp.length
  const root = inp[inp.length-1][0].value
  const inject = root.injectRT = new Map()
  const namespaces = root.namespaces
  const opts = root.opts
  if (!opts)
    return
  let any = false
  if (opts.importRT && !root.nsImported) {
    inject.set(root.$ns,{module:opts.importRT,
                         content:opts.inline,
                         ns:opts.importGlobal||opts.inline?null:root.$ns,
                         usages: new Set()})
  }
  for(let x = 0; x < len; ++x) {
    let i = inp[x]
    const {value} = i[0]
    if (value === root)
      continue
    i = inp[x] = Kit.toArray(Closure.calcStateRefs(inp[x]))
    value.scopeNum = scopeNum++
    const f = value.opts
    if (value.track) {
      value.injectRT = inject
      value.$ns = root.$ns
      any = true
      Kit.mapPush(transformMap,
                  f.transform || normalizeOnly,
                  x)
    } else {
      Kit.mapPush(transformMap,
                  loose,
                  x)
    }
    
  }
  if (!transformMap.size) {
    // no transforms, but it may need to erase some directives
    consume(varScope.resolve(loose(sa)))
    return
  }
  for(const [t,x] of transformMap) {
    for(const i of x)
      inp[i] = Kit.toArray(t(inp[i]))
  }
  finalize([...Rt.inject(Scope.restore(root,inp))])
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
