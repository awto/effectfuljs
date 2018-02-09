import * as Kit from "../kit"
import * as Policy from "../policy"
import * as Debug from "../debug"
import {ifDirectives} from "../options"

const fullOpts = {
  bindCalls: {
    byNs: {
      console:false,
      process:false,
      pack:false
    },
    libNs: {
      reify: false
    },
    all: true,
    ns: true
  },
  generator:false,
  async:false,
  coerce:true,
  transform:true
}

const minOpts = {
  bindCalls: {
    ns: true,
    libNs: {
      reflect: true
    }
  },
  coerce:true,
  generator:false,
  transform:true
}

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
    Policy.configDiffPass)))

export default Kit.pipe(
  function* init(si) {
    const generators = Policy.injectFuncOpts({
      generator:true,
      async:false,
      esRebind:true,
      static:true,
      transform:true,
      ops:generatorOps,
      coerce:false,
      scopePrefix:true,
      scopeConstructor:"generator",
      bindName:"yldStar",
      requireFinalPure:true,
      pureForOf:true
    })
    const asyncDo = Policy.injectFuncOpts({
      generator:false,
      async:true,
      bindCalls: {},
      esRebind:true,
      ops:generatorOps,
      coerce:false,
      transform:true,
      scopePrefix:true,
      scopeConstructor:"async",
      bindName:"chain",
      requireFinalPure:false,
      pureForOf:true
    })
    const asyncGeneratorsDo = Policy.injectFuncOpts({
      generator:true,
      async:true,
      bindCalls: {},
      esRebind:true,
      ops: generatorOps,
      coerce:false,
      transform:true,
      scopePrefix:true,
      scopeConstructor:"asyncGenerator",
      bindName:"chain",
      requireFinalPure:false,
      pureForOf:true
    })
    const disabled = Policy.injectFuncOpts(disabledOpts)
    const s = Kit.auto(si)
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
            return Kit.pipe(Policy.applySubAndOne,Policy.configDiffPass)
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



