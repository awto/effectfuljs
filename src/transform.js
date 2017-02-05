import * as R from "ramda"
import * as T from "babel-types"
import * as assert from "assert"
import dump from "estransducers/dump"
import * as trace from "estransducers/trace"
import * as Kit from "./kit"
import {Tag,produce,consume,enter,leave,tok} from "./kit"
import * as Loops from "./loops"
import * as State from "./state"
import * as Control from "./control"
import * as Scope from "./scope"
import * as Block from "./block"
import * as Prop from "./propagate"
import * as Uniq from "./uniq"
import * as Branch from "./branch"
import * as Exceptions from "./exceptions"
import * as Coerce from "./coerce"
import * as Policy from "./policy"
import * as Debug from "./debug"
import * as Placeholder from "./placeholder"
import * as Gens from "./generators"
import simplify from "./simplify"

export const consumeScope = consume

export const preproc = R.pipe(
  Kit.prepare,
  Prop.prepare,
  Policy.prepare,
  //  Placeholder.all,
  Scope.assignSymbolsDecls
)

export const scopes = R.pipe(
  preproc,
  Scope.splitScopes)

/**
 * entry point for the whole translator chain
 */
export function run(s) {
  for(const i of scopes(s)) {
    const {value} = i[0]
    const f = value.opts
    if (f != null && f.transform != null) {
      consume(f.transform(i))
    } else
      consume(i)
  }
}

const noState = R.pipe(
  Block.calcVarDeps(false),
  Block.groupDeps,
  Block.factorEffSeq,
  Prop.recalcEff)

const nonClosureState = R.pipe(
  Block.calcVarDeps(false),
  State.calcState,
  State.resetFwdDepForNonBind,
  Block.groupDeps,
  State.removeUselessWrites,
  State.injectLetWrites,
  Block.setPatVarToArgs,
  State.injectFrameReads,
  Prop.recalcEff,
  Block.cleanPureEff)

export const closureState = R.pipe(
  Block.calcVarDeps(false),
  State.calcState,
  State.calcClosOptDeps,
  State.resetFwdDepForNonBind,
  Block.groupDeps,
  Prop.recalcEff,
  Block.factorEffSeq,
  Prop.recalcEff,
  State.recalcState,
  State.aggregate,
  State.injectClosureReads,
  State.removeUselessWrites,
  State.aggregate,
  State.injectLetWrites,
  Block.setPatVarToArgs,
  State.injectFrameReads,
  Prop.recalcEff,
  Block.cleanPureEff)

/**
 * injects state operations and if possible tries to utilize closures
 */
function state(s) {
  const si = Kit.auto(s)
  const {state,closure} = si.opts
  const impl = state ?
        closure === false ? nonClosureState : closureState
        : noState
  return impl(si)
}

export const group = R.pipe(
  Block.calcVarDeps(true),
  Block.groupBindDeps,
  Prop.recalcEff,
  Block.lassoc
)

export const prepare = R.pipe(
  Control.assignLabels,
  Gens.prepare,
  Gens.remove,
  Prop.propagateEff,
  Scope.topCastToBody,
  Array.from
)

export const normilize = R.pipe(
  Control.removeLabeldStatement,
  Loops.toBlocks,
  Branch.toBlocks,
  Branch.switchRewrite,
  Loops.forOfStmt,
  Loops.doWhileStmt,
  Prop.recalcEff,
  Loops.normilizeFor,
  Coerce.lift,
  Branch.liftSwitchCoerce,
  Prop.recalcEff
)

export const inject = R.pipe(
  Scope.recalcLocals,
  Control.injectBlock,
  Loops.injectRepeat,
  State.prepare,
  State.saveDecls,
  Prop.recalcEff,
  Branch.prepareLogical,
  Prop.recalcEff,
  Block.flatten,
  Uniq.collect,
  Exceptions.inject,
  Prop.recalcEff,
  Branch.liftCoerce,
  Prop.recalcEff,
  Block.splitEffBlock
)

/** 
 * full interpretation pass
 */
export const interpret = (opts) => R.pipe(
  Block.cleanPureFrames,
  Block.propagateBindVars,
  State.interpretStateOpts,
  State.renameVarPass,
  Prop.recalcEff,
  opts.par ? Loops.interpretParLoop : i => i,
  Control.interpret,
  Loops.interpretRepeat,
  Block.cleanupEffSeq,
  opts.par ? Block.interpretParEffSeq : i => i,
  Block.interpretBinEffSeq,
  Coerce.inject,
  Coerce.liftFuncs,
  Block.interpretPure,
  Block.interpretApp,
  Block.interpretBindFrame,
  Coerce.interpret,
  Block.interpretCasts)

export const finalize = R.pipe(
  Branch.clean,
  State.restoreDecls,
  Uniq.subst,
  simplify)

/**
 * stack passes in required order depending on options specified
 */
export const all = (opts = {coerce:true,state:"all"}) => R.pipe(
  prepare,
  normilize,
  inject,
  state,
  group,
  interpret(opts),
  finalize
)

export const defaultTransform = R.pipe(
  Policy.defaultPrepare,
  all())

export const defaultGensTransform = R.pipe(
  Policy.defaultPrepare,
  all())

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

export const injectOpts = (opts) => 
  function* injectOpts(s) {
    yield Kit.tok(Policy.configDiff,{node:opts,alg:"assign"})
  }

/** sets options to each sub-function */
export const injectFuncOpts = (opts) => {
  const generator = !!opts.generator
  return function* injectFuncOpts(s) {
    yield Kit.tok(Policy.sub, {
      *run(inner) {
        for(const i of inner) {
          if (i.enter && i.value.func && generator === !!i.value.node.generator) {
            i.value.optsAssign = Object.assign(i.value.optsAssign || {},opts)
          }
          yield i
        }
      }
    })
  }
}

export const profileDef = (name) => injectOpts({mode:name})
export const genProfileDef = (name) => injectOpts({gmode:name})

export const delayedProfileDef = (name) => injectFuncOpts({mode:name})
export const delayedGenProfileDef = (name) => injectFuncOpts({gmode:name})

export default main

