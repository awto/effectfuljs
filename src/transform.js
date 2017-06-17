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
import simplify from "./simplify"
import {ifNested, ifLeft,ifLFlat,ifState,ifClosure,onChainType} from "./options"

export const consumeScope = consume

export const preproc = R.pipe(
  Kit.prepare,
  Prop.prepare,
  Policy.prepare,
  varScope.prepare
)

export const scopes = R.pipe(
  preproc,
  Scope.splitScopes)

const restore = R.pipe(
  Scope.restore,
  varScope.resolve,
  consume)

const ifEff = R.curry(function (others, si) {
  const s = Kit.auto(si)
  return s.first.value.topEff ? others(s) : s
})

/**
 * passes in required order depending on options specified
 */
export const all =
  R.pipe(
    Control.assignLabels,
    Gens.prepare, Gens.remove,
    //  Ops.injectOps,
    Prop.propagateEff,
    Kit.toArray,
    ifEff(R.pipe(
      Control.removeLabeldStatement,
      Loops.toBlocks,
      Branch.toBlocks,
      ifNested(R.pipe(Branch.switchRewrite)),
      Loops.forOfStmt,
      Loops.doWhileStmt,
      Prop.recalcEff,
      Loops.normilizeFor,
      Coerce.lift,
      Branch.liftSwitchCoerce,
      State.saveDecls,
      Prop.recalcEff,
      Control.injectBlock,
      Loops.injectRepeat,
      Prop.recalcEff,
      Branch.prepareLogical,Prop.recalcEff,
      Bind.flatten,
      Exceptions.inject,Prop.recalcEff,
      // Branch.liftCoerce,Prop.recalcEff,
      Block.splitEffBlock,
      State.prepare,
      onChainType({
        left: R.pipe(
          ifClosure(R.pipe(Bind.calcVarDeps(null),
                           ifState(State.closureReGroup),
                           Bind.groupDeps,
                           Prop.recalcEff
                        ),
                    R.pipe(Bind.calcVarDeps(null),
                           Bind.threadDeps,
                           Bind.injectThreadMaps
                          )),
          ifState(State.calcFrameStateVars),
          Block.factorEffSeq,
          Prop.recalcEff,
          ifState(ifClosure(State.closure)),
          Bind.propagateBindVars,
          ifState(State.inject),
          Prop.recalcEff,
          Block.lassoc,
          Block.cleanPureFrames,
          Bind.propagateBindVars),
        right: R.pipe(
          // TODO: join rassoc with factor
          Block.rassoc,
          Block.factorEffSeq,
          Prop.recalcEff,
          ifState(State.calcFrameStateVars),
          ifState(ifClosure(State.closure)),
          Bind.propagateBindVars,
          ifState(R.pipe(State.inject,Block.lassoc)),
          Prop.recalcEff,
          Block.cleanPureFrames,
          Bind.propagateBindVars),
        lflat: R.pipe(
          Bind.calcVarDeps(null),
          Bind.threadDeps,
          Control.recalc,
          Flat.convert
        )
      }),
      Block.cleanPureEff,
      ifLFlat(Flat.interpret,
              R.pipe(
                State.interpret,
                Prop.recalcEff,
                Control.interpret,
                Loops.interpretRepeat,
                Block.cleanupEffSeq,
                Kit.enableIf(i => i.parLoops, Loops.interpretParLoop),
                Block.interpretParEffSeq,
                Block.interpretBinEffSeq,
                Coerce.inject,
                Coerce.liftFuncs,
                Block.interpretPure,
                Bind.interpret)),
      Block.interpretApp,
      Coerce.interpret,
      Block.interpretCasts,
      Block.interpretSyms,
      Branch.clean,
      State.restoreDecls,
      simplify)))

export const defaultTransform = R.pipe(Policy.defaultPrepare,all)
export const defaultGensTransform = R.pipe(Policy.generatorsPrepare, all)

/**
 * entry point for the whole translator chain
 */
export function run(s) {
  let inject = new Map()
  let any = false
  function* scopesRun() {
    for(const i of scopes(s)) {
      const {value} = i[0]
      const f = value.opts
      if (f != null && f.transform) {
        if (f.inject && f.require && f.ns)
          inject.set(f.ns,f.require)
        any = true
        yield Kit.toArray(f.transform(i))
      } else
        yield i
    }
  }
  const res = [...scopesRun()]
  if (any) {
    const root = res[res.length-1]
    if (inject.size) {
      const namespaces = root[0].value.namespaces || new Map()
      const toInject = []
      for(const [ns,mod] of inject) {
        const imported = namespaces.get(mod)
        if (!imported || ns !== imported)
          toInject.push([ns,mod])
      }
      res[res.length - 1] = Rt.inject(toInject,root)
    }
    restore(res)
  }
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
