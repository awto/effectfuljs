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
import * as Inline from "./inline"
import * as Simplify from "./simplify"
import {ifLoose,ifEsRebind,ifTopLevel,
        ifJsExceptions} from "./options"

export const consumeScope = consume

export const preproc = Kit.pipe(
  Kit.scope.prepare,
  Prop.prepare,
  Policy.prepare,
  Policy.stage("prepare"),
  Gens.prepare,
  Scope.arrowFunToBlock,
  Policy.unwrapNs,
  Policy.assignBindCalls,
  Policy.assignThrowEff,
  Policy.stage("propagate"),
  Control.assignLabels,
  Prop.propagateEff,
  State.prepare)

/* default transform for all functions if loose mode is set */
export const loose = ifLoose(Kit.pipe(
  Loops.looseForOf,
  Rt.collect,
  Kit.toArray,
  Simplify.blockScoping,
  Simplify.main,
  Rt.interpretLibSyms,
  Rt.inject))

const finalize = Kit.pipe(
  Scope.funcWraps,
  Simplify.main,
  ifLoose(Loops.looseForOf),
  Rt.interpretLibSyms,
  Kit.toArray,
  Rt.inject,
  Closure.depsToTop,
  varScope.resolve,
  consume)

const ifEff = Kit.enableIf(i => i.topEff)
const ifTrack = (t,e) => function*(s) {
  for(const i of s)
    yield Kit.enableIf(i => i.track,t,e)
}

export const normalizeOnlyStage0 =
  Kit.map(Kit.pipe(
    ifTopLevel(Kit.pipe(
      Loops.toBlocks,
      State.saveDecls,
      Kit.toArray
    ))))

export const normalizeOnlyStage1 =
  Kit.map(Kit.pipe(
    Branch.clean,
    State.restoreDecls,
    Closure.substContextIds,
    Kit.toArray))

/**
 * passes in required order depending on options specified
 */
export const stage0 = Kit.pipe(
  Kit.map(Kit.pipe(
    Gens.functionSentPrepare,
    Control.injectExplicitRet,
    Ops.inject,
    Policy.stage("normalize"),
    Kit.toArray,
    Control.removeLabeldStatement,
    Loops.toBlocks,
    Loops.whileStmt,
    Loops.forOfStmt,
    Loops.doWhileStmt,
    Prop.recalcEff,
    Branch.normilizeSwitch,
    Prop.recalcEff,
    Branch.addAlternate,
    Branch.toBlocks)),
  Loops.normalizeFor,
  Kit.map(Kit.pipe(
    State.saveDecls,
    Prop.recalcEff,
    Coerce.lift
  )),
  Control.injectBlock,
  Kit.map(Kit.pipe(
    Prop.recalcEff,
    Policy.stage("organize"),
    Bind.flatten,
    Prop.recalcEff,
    Policy.stage("inject"),
    Exceptions.inject,
    Prop.recalcEff,
    Block.splitEffBlock,
    Ops.combine,
    Flat.convert,
    Inline.jsExceptions)))

const stage1 = Kit.pipe(
  Kit.map(Kit.pipe(
    Block.cleanPureEff,
    Policy.stage("interpret"),
    Ops.interpret,
    Flat.interpret,
    Inline.ops,
    Coerce.inject,
    Block.interpretApp,
    Coerce.interpret,
    Block.interpretCasts,
    Branch.clean,
    State.restoreDecls,
    Closure.substContextIds,
    Block.ctxMethods,
    Rt.collect,
    Simplify.main,
    Kit.toArray
  )))

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
  if (opts.importRT && !root.nsImported)
    inject.set(root.$ns,{module:opts.importRT,
                         content:opts.inlineRT,
                         ns:opts.importGlobal||opts.inlineRT?null:root.$ns,
                         usages: new Set()})
  const normalize = []
  const transform = []
  const others = []
  for(const i of inp)
    i[0].value.track = i[0].value.topEff
  // even pure functions must be converted if they have shared vars
  for(const i of inp) {
    const root = i[0].value
    if (root.scopeDecls) {
      for(const j of root.scopeDecls) {
        if (j.interpr === Bind.ctxField) {
          root.track = true
          if (j.refScopes) {
            for(const k of j.refScopes) {
              k.track = true
              k.closure = true
            }
          }
        }
      }
    }
  }
  for(let x = 0; x < len; ++x) {
    let i = inp[x]
    const {value} = i[0]
    if (value === root) {
      others.push(i)
      continue
    }
    value.scopeNum = scopeNum++
    const f = value.opts
    if (value.track) {
      value.injectRT = inject
      value.$ns = root.$ns
      any = true
      if (f.transform && value.topEff)
        transform.push(i)
      else
        normalize.push(i)
    } else
      others.push(i)
  }
  if (!transform.length) {
    // no transforms, but it may need to erase some directives
    consume(varScope.resolve(ifLoose(loose)(sa)))
    return
  }
  const s0 = [...stage0(transform)]
  const n0 = [...normalizeOnlyStage0(normalize)]
  const s1 = [...Closure.contextDecls(s0)]
  const n1 = [...Closure.contextDecls(n0)]
  const res = [...others,...stage1(s1),...normalizeOnlyStage1(n1)]
  finalize([...Scope.restore(root,res)])
}

export function main(ast,opts = {}) {
  return Kit.optsScope(function main(f) {
    Kit.setOpts(opts)
    run(Kit.produce(ast))
    return ast
  })
}

export function applyPass(ast,pass,opts = {}) {
  return Kit.optsScope(function applyPass(f) {
    Kit.setOpts(opts)
    pass(Kit.produce(ast))
    return ast
  })
}

export default main

