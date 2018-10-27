const C = require("@effectful/core")
const config = C.config
const Policy = C.Policy
const T = C.Transform
const Tag = C.Tag
const Kit = C.Kit

const rebind = {
  all: {
    presetsImportPattern:false,
    directives:false,
    bindCalls: null,
    reuseImports:false
  },
  effectful: {
    scopeContext:true,
    contextMethodOps:true,
    markRepeat:false,
    markBindValue:false,
    markCatchCont:false,
    markArgNum:false,
    markErrorCont: false,
    markResultCont: false,
    scopeContext:true,
    scopePrefix:true,
    scopePostfix:true,
    contextState:false,
    defunct: false,
    topLevel: false,
    static:true,
    combineOps:true,
    scopePrefix:true,
    coerce:false,
    contextBy:"this",
    shortFrameNames:false,
    keepLastPure:true,
    keepLastRaise:true,
    inlineRaiseOp:null,
    inlineScopeOp:null,
    inlinePureJumps:null,
    esForAwaitOf:true,
    contextMethodOpsSpec: {
      iterator: false,
      iteratorM: false,
      forInIterator: false
    }
  },
  generators: {
    bindName:"yldStar",
    scopeConstructor:"generator",
    markRepeat:false,
    scopePostfix:true,
    wrapFunction: "generatorFunction",
    storeResultCont:"$exit",
    ops:{YieldExpression: true}
  },
  async: {
    bindName:"chain",
    scopeConstructor:"async",
    ops:{AwaitExpression: true},
    wrapFunction: "asyncFunction"
  },
  asyncGenerators: {
    bindName:"chain",
    scopeConstructor:"asyncGenerator",
    scopePostfix:true,
    storeResultCont:"$exit",
    wrapFunction: "asyncGeneratorFunction",
    ops:{
      YieldExpression: true,
      AwaitExpression: true
    }
  }
}

const inline = {
  effectful: {
    contextBy:"reference",
    inlineJsExceptions:true,
    inlinePureJumps:"call",
    inlineScopeOp:"context",
    markRepeat:true,
    keepLastPure:true,
    keepLastRaise:true
  },
  generators: {
    inlineResultContAssign:true,
    inlineErrorContAssign:true,
    inlineContAssign:true,
    storeCont:"$step",
    storeResultCont:"$exit",
    storeErrorCont:"$handle",
    inlineYieldOp:"iterator",
    inlineYieldStarOp:"iterator",
    inlineReentryCheck:true,
    inlinePureOp: "iterator",
    inlineRaiseOp:"throw"
  },
  async: {
    storeCont:false ,
    storeErrorCont:false,
    inlineResultContAssign:false,
    inlineErrorContAssign:false,
    inlineContAssign:false,
    scopeContext:false,
    scopePrefix:false,
    inlinePureOp:"promise",
    inlineScopeOp:null,
    inlineChainOp:"promise",
    storeResultCont:false,
    inlineRaiseOp:"promise",
    inlinePureOp: "promise"
  },
  asyncGenerators: {
    inlineResultContAssign:true,
    inlineErrorContAssign:true,
    inlineContAssign:true,
    inlineScopeOp:"unwrap",
    storeCont:"$step",
    storeErrorCont:"$handle",
    storeResultCont:"$exit",
    inlineYieldOp:"iteratorResultPromise",
    inlineYieldStarOp:"iterator",
    inlineChainOp:"promise",
    inlinePureOp: "iterator",
    inlineRaiseOp:"promise"
  }
}

const defunct = {
  effectful: {
    storeCont:"$step",
    storeHandler:"$run",
    defunct:true,
    defunctStateDiscriminant:"arg",
    storeErrorCont:false,
    storeResultCont:false,
    inlineErrorContAsign: false,
    inlineResultContAssign:false,
    staticPure:true
  }
}

const defunctInline = {
  effectful: {
    markRepeat:false,
    defunctStateDiscriminant:"field",
    storeCont:"$step",
    storeHandler:"step",
    inlinePureJumps:"tail",
    storeResultCont:"$exit",
    storeErrorCont:"$handle",
    inlineResultContAssign:true,
    inlineErrorContAssign:true,
    inlineContAssign:true,
    scopePrefix:true
  },
  async: {
    inlineScopeOp:"call"
  },
  asyncGenerators: {
    storeHandler:"next"
  }
}

const loose = {
  all: {
    loose:true,
    leanForOf:true,
    finalizeForOf:false,
    removeAsserts:true
  },
  effectful: {
    wrapFunction:false,
    wrapAsyncIteratorValue:false,
    inlineReentryCheck:false
  }
}

const topLevel = {
  file: {
    topLevel: true
  },
  all: {
    topLevel:true,
    contextBy: "this",
    contextState:true
  }
}


const topLevelDefunct = {
  effectful: {
    defunctHandlerInProto: true
  },
  generators: {
    wrapFunction: "generatorFunction"
  },
  async: {
    wrapFunction: "asyncFunction"
  },
  asyncGenerators: {
    wrapFunction: "asyncGeneratorFunction"
  }
}

const disabled = {
  pure:{transform:false,loose:false,importRT:null},
  generators:{transform:false,loose:false,importRT:null},
  async:{transform:false,loose:false,importRT:null},
  asyncGenerators:{transform:false,loose:false,importRT:null}
}

module.exports = function esProfile(opts={}) {
  let importRT = opts.importRT
  if (importRT == null) {
    const p = []
    if (opts.defunct === false)
      p.push("funct")
    if (opts.loose)
      p.push("loose")
    else if (opts.inline)
      p.push("inline")
    if (opts.all && opts.all.jsTailCalls)
      p.push("tc")
    importRT = "@effectful/es-rt"
    if (p.length)
      importRT += "/opts/" + p.join("-")
  }
  const pure = Object.assign({},config,rebind.all)
  const file = Object.assign({},config,
                             {importRT,modules:opts.modules},
                             rebind.all)
  const generators = Object.assign({},config,rebind.all,
                                   rebind.effectful,rebind.generators)
  const async = Object.assign({},config,rebind.all,rebind.effectful,rebind.async)
  const asyncGenerators = Object.assign({},config,rebind.all,rebind.effectful,
                                        rebind.asyncGenerators)
  if (opts.loose)
    opts.inline = true
  if (opts.inline) {
    Object.assign(generators,inline.all,
                  inline.effectful,inline.generators)
    Object.assign(async,inline.all,inline.effectful,inline.async)
    Object.assign(asyncGenerators,inline.all,inline.effectful,
                  inline.asyncGenerators)
  }
  if (opts.defunct !== false) {
    Object.assign(generators,defunct.effectful)
    Object.assign(async,defunct.effectful)
    Object.assign(asyncGenerators,defunct.effectful)
    if (opts.inline) {
      Object.assign(generators,defunctInline.effectful)
      Object.assign(async,defunctInline.effectful,defunctInline.async)
      Object.assign(asyncGenerators,defunctInline.effectful,defunctInline.asyncGenerators)
    }
  }
  if (opts.loose) {
    Object.assign(pure,loose.all)
    Object.assign(file,loose.all)
    Object.assign(generators,loose.all,loose.effectful)
    Object.assign(async,loose.all,loose.effectful)
    Object.assign(asyncGenerators,loose.all,loose.effectful)
  }
  if (opts.topLevel) {
    Object.assign(file,topLevel.all,topLevel.file)
    Object.assign(pure,topLevel.all)
    Object.assign(generators,topLevel.all,topLevel.effectful)
    Object.assign(async,topLevel.all,topLevel.effectful)
    Object.assign(asyncGenerators,topLevel.all,topLevel.effectful)
    if (opts.defunct) {
      Object.assign(generators,topLevelDefunct.effectful,topLevelDefunct.generators)
      Object.assign(async,topLevelDefunct.effectful,topLevelDefunct.async)
      Object.assign(asyncGenerators,topLevelDefunct.effectful,topLevelDefunct.asyncGenerators)
    }
  }
  if (opts.par) {
    const newOpts = {
      par:true,
      parRegion:false,
      blockDirectives: {
        par: {
          parRegion: true
        },
        seq: {
          parRegion: false
        }
      }
    }
    Object.assign(file, newOpts)
    Object.assign(async, newOpts)
    Object.assign(asyncGenerators, newOpts)
  }
  Object.assign(pure,opts.all,opts.pure,
                {generator:false,async:false,transform:false})
  Object.assign(file,opts.all,opts.file,
                {generator:false,async:false,transform:false})
  Object.assign(generators,opts.all,opts.effectful,opts.generators,
                {generator:true,async:false,transform:true})
  Object.assign(async,opts.all,opts.effectful,opts.async,
                {generator:false,async:true,transform:true})
  Object.assign(asyncGenerators,opts.all,opts.effectful,
                opts.asyncGenerators,
                {generator:true,async:true,transform:true})
  let any = false
  return {
    syntaxPlugins:["asyncGenerators","functionSent"],
    options: file,
    main(si) {
      const sa = Kit.toArray(si)
      let any
      for(const i of sa) {
        if (i.enter) {
          switch(i.type) {
          case Tag.File:
            i.value.optsSet = file
            break
          case Tag.ClassMethod:
          case Tag.ObjectMethod:
          case Tag.ArrowFunctionExpression:
          case Tag.FunctionExpression:
          case Tag.FunctionDeclaration:
            const {node} = i.value
            if (node.generator || node.async)
              any = true
            i.value.optsSet = node.generator
              ? (node.async ? asyncGenerators : generators)
            : (node.async ? async : pure)
            break
          }
        }
      }
      if (any || loose)
        T.run(Policy.propagateOpts(Policy.propagateBlockDirs(sa)))
    }
  }
}

