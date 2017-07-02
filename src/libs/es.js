import * as Policy from "../policy"
import * as T from "../transform"
import * as R from "ramda"

export default function* generatorsInit($ns) {
  return R.pipe(
    Policy.setFuncOpts({generator:true,
                        async:false,
                        topLevel:true,
                        esRebind:true,
                        transform:T.defaultGensTransform,
                        $ns
                       }),
    Policy.setFuncOpts({generator:false,
                        async:true,
                        topLevel:true,
                        esRebind:true,
                        transform:T.defaultGensTransform,
                        $ns
                       }),
    Policy.setFuncOpts({generator:true,
                        async:true,
                        topLevel:true,
                        esRebind:true,
                        pureForOf:true,
                        transform:T.defaultGensTransform,
                        $ns
                       }),
    Policy.configDiffPass)
}

