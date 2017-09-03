import * as Policy from "../policy"
import * as T from "../transform"
import * as Kit from "../kit"

export default function* generatorsInit() {
  const ops = {
    YieldExpression: true,
    AwaitExpression: true
  }
  return Kit.pipe(
    Policy.setFuncOpts({generator:false,
                        async:false,
                        coerce:false,
                        transform:null
                       }),
    Policy.setFuncOpts({generator:true,
                        async:false,
                        transform:T.defaultGensTransform,
                        bindName:"yldStar",
                        scopePrefix:true,
                        scopeConstructor:"generator",
                        static:true,
                        coerce:false,
                        combineOps:true,
                        esRebind:true,
                        ops
                       }),
    Policy.setFuncOpts({generator:false,
                        async:true,
                        static:true,
                        transform:T.defaultGensTransform,
                        bindName:"chain",
                        scopePrefix:true,
                        scopeConstructor:"async",
                        static:true,
                        coerce:false,
                        combineOps:true,
                        esRebind:true,
                        ops
                       }),
    Policy.setFuncOpts({generator:true,
                        async:true,
                        static:true,
                        transform:T.defaultGensTransform,
                        bindName:"chain",
                        scopePrefix:true,
                        scopeConstructor:"asyncGenerator",
                        static:true,
                        coerce:false,
                        combineOps:true,
                        esRebind:true,
                        ops
                       }),
    Policy.configDiffPass)
}

