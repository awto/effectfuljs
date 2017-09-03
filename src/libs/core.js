import * as Kit from "../kit"
import * as Policy from "../policy"
import * as Debug from "../debug"
import {defaultTransform,defaultGensTransform} from "../transform"

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
  coerce:true,
  transform: defaultTransform
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
  transform: defaultTransform
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
  Policy.profiles,
  Policy.setQNames)

export default function* coreInit() {
  const generators = Policy.injectFuncOpts({
    generator:true,
    async:false,
    esRebind:true,
    static:true,
    transform:defaultGensTransform,
    ops:generatorOps,
    coerce:false,
    scopePrefix:true,
    scopeConstructor:"generator"
  })
  const asyncDo = Policy.injectFuncOpts({
    generator:false,
    async:true,
    bindCalls: {},
    esRebind:true,
    ops:generatorOps,
    coerce:false,
    transform:defaultGensTransform,
    scopePrefix:true,
    scopeConstructor:"async"
  })
  const asyncGeneratorsDo = Policy.injectFuncOpts({
    generator:true,
    async:true,
    bindCalls: {},
    esRebind:true,
    pureForOf:true,
    ops: generatorOps,
    coerce:false,
    transform:defaultGensTransform,
    scopePrefix:true,
    scopeConstructor:"asyncGenerator"
  })
  const disabled = Policy.injectFuncOpts(disabledOpts)
  return Kit.pipe(
    function*(si) {
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
}

