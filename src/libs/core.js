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
  transform: defaultTransform
}

const minOpts = {
  bindCalls: {
    ns: true,
    libNs: {
      reflect: true
    }
  },
  generator:false,
  transform: defaultTransform
}

const disabledOpts = {
  transform: false
}

const generatorOps = {
  YieldExpression: true
}

const postproc = Kit.pipe(
  Policy.setFuncOpts(disabledOpts),
  Policy.profiles,
  Policy.setQNames)

export default function* coreInit($ns) {
  const generators = Policy.injectFuncOpts({
    generator:true,
    async:false,
    bindCalls: {},
    esRebind:true,
    ops: generatorOps,
    transform:defaultGensTransform
  })
  const asyncAwaitDo = Policy.injectFuncOpts({
    generator:false,
    async:true,
    bindCalls: {},
    esRebind:true,
    transform:defaultGensTransform
  })
  const asyncGeneratorsDo = Policy.injectFuncOpts({
    generator:true,
    async:true,
    bindCalls: {},
    esRebind:true,
    pureForOf:true,
    ops: generatorOps,
    transform:defaultGensTransform
  })
  return Kit.pipe(
    function*(si) {
      const s = Kit.auto(si)
      yield Kit.tok(Policy.configDiff,{
        node: {
          profiles: {
            disabled:Policy.injectFuncOpts(disabledOpts),
            full:Kit.pipe(Policy.injectOpts(fullOpts),
                        Policy.injectFuncOpts(fullOpts)),
            defaultFull:Policy.injectFuncOpts(fullOpts),
            minimal:Kit.pipe(Policy.injectOpts(minOpts),
                           Policy.injectFuncOpts(minOpts)),
            defaultMinimal:Policy.injectFuncOpts(minOpts),
            generators,asyncAwaitDo,asyncGeneratorsDo,
            es:function* () {
              yield* generators()
              yield* asyncGeneratorsDo()
              yield* asyncAwaitDo()
            }
          },
          $ns
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

