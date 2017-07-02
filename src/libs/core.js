import * as Kit from "../kit"
import * as Policy from "../policy"
import * as Debug from "../debug"
import {defaultTransform,defaultGensTransform} from "../transform"
import * as R from "ramda"

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

const postproc = R.pipe(
  Policy.setFuncOpts(disabledOpts),
  Policy.profiles,
  Policy.setQNames)

export default function* coreInit($ns) {
  const generators = Policy.injectFuncOpts({
    generator:true,
    async:false,
    bindCalls: {},
    esRebind:true,
    coerce:false,
    ops: generatorOps,
    transform:defaultGensTransform
  })
  const asyncAwaitDo = Policy.injectFuncOpts({
    generator:false,
    async:true,
    bindCalls: {},
    esRebind:true,
    coerce:false,
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
  return R.pipe(
    function*(si) {
      const s = Kit.auto(si)
      yield Kit.tok(Policy.configDiff,{
        node: {
          profiles: {
            disabled:Policy.injectFuncOpts(disabledOpts),
            full:R.pipe(Policy.injectOpts(fullOpts),Policy.injectFuncOpts(fullOpts)),
            defaultFull:Policy.injectFuncOpts(fullOpts),
            minimal:R.pipe(Policy.injectOpts(minOpts),Policy.injectFuncOpts(minOpts)),
            defaultMinimal:Policy.injectFuncOpts(minOpts),
            generators,asyncAwaitDo,asyncGeneratorsDo,
            es:Kit.concat(generators,asyncAwaitDo,asyncGeneratorsDo),
            generatorsDo:Policy.injectFuncOpts({
              bindCalls: {},
              generator:true,
              generatorDo:true,
              coerce:false,
              transform:defaultGensTransform
            })
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

