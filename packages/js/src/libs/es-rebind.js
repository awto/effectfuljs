import * as Policy from "../policy"
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
                        transform:true,
                        bindName:"yldStar",
                        scopePrefix:true,
                        scopeConstructor:"generator",
                        static:true,
                        coerce:false,
                        combineOps:true,
                        ops,
                        scopePostfix:true,
                        pureForOf:true,
                        resultCont:true,
                        wrapFunction: "generatorFunction"
                       }),
    Policy.setFuncOpts({generator:false,
                        async:true,
                        static:true,
                        transform:true,
                        bindName:"chain",
                        scopePrefix:true,
                        scopeConstructor:"async",
                        static:true,
                        coerce:false,
                        combineOps:true,
                        ops,
                        scopePostfix:false,
                        pureForOf:true,
                        resultCont:false,
                        wrapFunction: "asyncFunction"
                       }),
    Policy.setFuncOpts({generator:true,
                        async:true,
                        static:true,
                        transform:true,
                        bindName:"chain",
                        scopePrefix:true,
                        scopeConstructor:"asyncGenerator",
                        static:true,
                        coerce:false,
                        combineOps:true,
                        ops,
                        scopePostfix:true,
                        pureForOf:true,
                        resultCont:true,
                        wrapFunction: "asyncGeneratorFunction"
                       }),
    Policy.configDiffPass)
}
