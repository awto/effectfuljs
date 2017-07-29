import * as Policy from "../policy"
import * as T from "../transform"
import * as R from "ramda"

export default function* generatorsInit($ns) {
  const ops = {
    YieldExpression: true
  }
  return R.pipe(
    Policy.setFuncOpts({generator:true,
                        async:false,
                        esRebind:true,
                        static:true,
                        transform:T.defaultGensTransform,
                        coerce:true,
                        ops,
                        scopePrefix:true,
                        combineOps:true,
                        $ns
                       }),
    Policy.setFuncOpts({generator:false,
                        async:true,
                        esRebind:true,
                        static:true,
                        transform:T.defaultGensTransform,
                        scopePrefix:true,
                        $ns
                       }),
    Policy.setFuncOpts({generator:true,
                        async:true,
                        esRebind:true,
                        pureForOf:true,
                        static:true,
                        transform:T.defaultGensTransform,
                        ops,
                        scopePrefix:true,
                        combineOps:true,
                        $ns
                       }),
    Policy.configDiffPass)
}

