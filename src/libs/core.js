import {tok} from "../kit"
import {configDiff} from "../policy"
import {defaultTransform,
        defaultGensTransform,
        injectFuncOpts,
        injectOpts
       } from "../transform"

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


export default function* coreInit(ns) {
  yield tok(configDiff,{
    node: {
      state:true,
      closure:true,
      coerce:true,
      profiles: {
        full:injectOpts(fullOpts),
        defaultFull:injectFuncOpts(fullOpts),
        minimal:injectOpts(minOpts),
        defaultMinimal:injectFuncOpts(minOpts),
        generators:injectFuncOpts({
          bindCalls: {},
          generator:true,
          coerce:false,
          transform:defaultGensTransform
        }),
        generatorsDo:injectFuncOpts({
          bindCalls: {},
          generator:true,
          generatorDo:true,
          coerce:false,
          transform:defaultGensTransform
        }),
        noState:injectOpts({state:false}),
        closureState:injectOpts({state:true,closure:true})
      },
      ns
    }
  })
}

