import {tok} from "../kit"
import {configDiff,profile} from "../policy"
import {defaultGensTransform,injectFuncOpts,injectOpts} from "../transform"

export default function* generatorsInit(ns) {
  yield tok(configDiff,{
    node: {
      profiles: {
        disabled:injectFuncOpts({generator:true,transform:false}),
        enabled:injectFuncOpts({generator:true,
                                closure:true,
                                coerce:false,
                                state:false,
                                transform:defaultGensTransform,
                                ns
                               })
      }
    }
  })
  yield tok(profile,{node:{name:"enabled"}})
}

