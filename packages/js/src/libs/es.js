import * as Policy from "../policy"
import * as Kit from "../kit"

export default function* generatorsInit(opts) {
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
    Policy.setFuncOpts(Object.assign(
      {generator:true,
       async:false,
       transform:true,
       bindName:"yldStar",
       scopePrefix:true,
       scopeConstructor:"generator",
       static:true,
       combineOps:true,
       ops,
       scopePostfix:true,
       wrapFunction: "generatorFunction"
      },
      opts.all,opts.generators)),
    Policy.setFuncOpts(Object.assign(
      {generator:false,
       async:true,
       static:true,
       transform:true,
       bindName:"chain",
       scopePrefix:true,
       scopeConstructor:"async",
       static:true,
       combineOps:true,
       ops,
       wrapFunction: "asyncFunction"
      },opts.all,opts.async)),
    Policy.setFuncOpts(Object.assign(
      {generator:true,
       async:true,
       static:true,
       transform:true,
       bindName:"chain",
       scopePrefix:true,
       scopeConstructor:"asyncGenerator",
       static:true,
       combineOps:true,
       ops,
       scopePostfix:true,
       wrapFunction: "asyncGeneratorFunction"
      },opts.all,opts.asyncGenerators)),
    Policy.configDiffPass)
}
