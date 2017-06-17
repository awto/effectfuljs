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

const postproc = R.pipe(
  Policy.setFuncOpts(disabledOpts),
  Policy.profiles,
  Policy.setQNames)

export default function* coreInit(ns) {
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
            generators:Policy.injectFuncOpts({
              bindCalls: {},
              generator:true,
              coerce:false,
              transform:defaultGensTransform
            }),
            generatorsDo:Policy.injectFuncOpts({
              bindCalls: {},
              generator:true,
              generatorDo:true,
              coerce:false,
              transform:defaultGensTransform
            })
          },
          ns
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

