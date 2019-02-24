import * as Kit from "../kit"
import * as Policy from "../policy"
import {ifDirectives} from "../options"

const disabledOpts = {
  transform: false
}

const generatorOps = {
  YieldExpression: true,
  AwaitExpression: true
}

const postproc = Kit.pipe(
  Policy.setFuncOpts(disabledOpts),
  Policy.setQNames,  
  Policy.configDiffPass,
  Policy.applyProfiles,
  ifDirectives(Kit.pipe(
    Policy.directives,
    Policy.configDiffPass,
    Policy.applyProfiles,
    Policy.configDiffPass)),
  Policy.propagateBlockDirs,
  Policy.propagateOpts
)

export default Kit.pipe(
  function* init(si) {
    const s = Kit.auto(si)
    const defaults = s.opts.effectful
    const disabled = Policy.injectFuncOpts(disabledOpts)
    const generators = Policy.injectFuncOpts(Object.assign({
      generator:true,
      async:false,
      esRebind:true,
      static:true,
      transform:true,
      ops:generatorOps,
      coerce:false,
      scopePrefix:true,
      bindName:"yldStar",
      requireFinalPure:true,
      pureForOf:true,
      keepLastPure:true
    },defaults))
    const asyncDo = Policy.injectFuncOpts(Object.assign({
      generator:false,
      async:true,
      bindCalls: {},
      esRebind:true,
      ops:generatorOps,
      coerce:false,
      static:true,
      transform:true,
      scopePrefix:true,
      combineOps:true,
      bindName:"chain",
      requireFinalPure:false,
      pureForOf:true,
      keepLastPure:true
    },defaults))
    const asyncGeneratorsDo = Policy.injectFuncOpts(Object.assign({
      generator:true,
      async:true,
      bindCalls: {},
      esRebind:true,
      ops: generatorOps,
      coerce:false,
      transform:true,
      scopePrefix:true,
      combineOps:true,
      bindName:"chain",
      requireFinalPure:false,
      pureForOf:true,
      keepLastPure:true
    },defaults))
    const fullOpts = Object.assign({
      bindCalls: {
        byNs: {
          console:false,
          process:false,
          pack:false
        },
        all: true,
        ns: true
      },
      generator:false,
      async:false,
      coerce:true,
      transform:true
    },defaults)
    const minOpts = Object.assign({
      bindCalls: {
        ns: true,
        libNs: {
          reflect: true
        }
      },
      coerce:true,
      generator:false,
      transform:true
    },defaults)
    yield Kit.tok(Policy.configDiff,{
      node: {
        profiles: {
          disabled,
          full:Kit.pipe(Policy.injectOpts(fullOpts),
                        Policy.injectFuncOpts(fullOpts)),
          defaultFull:Policy.injectFuncOpts(fullOpts),
          minimal:Kit.pipe(Policy.injectOpts(minOpts),
                           Policy.injectFuncOpts(minOpts)),
          defaultMinimal:Policy.injectFuncOpts(minOpts),
          generators,asyncDo,asyncGeneratorsDo,
          es:function* () {
            yield* disabled()
            yield* generators()
            yield* asyncGeneratorsDo()
            yield* asyncDo()
            return Kit.pipe(Policy.applySubAndOne,
                            Policy.configDiffPass)
          }
        }
      }
    })
    let {profile} = s.opts
    if (profile != null) {
      if (!Array.isArray(profile))
        profile = [profile]
    for(const i of profile)
      yield Kit.tok(Policy.profile,{node:{name:i}})
    }
    yield* s
  },
  postproc)
