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
    contextState:false,
    defunct: false,
    topLevel: false,
    static:true,
    combineOps:true,
    scopePrefix:true,
    coerce:false,
    contextBy:"this",
    shortFrameNames:false,
    contextMethodOpsSpec: {
      iterator: false,
      iteratorM: false,
      forInIterator: false
    }
  },
  generators: {
    bindName:"yldStar",
    scopeConstructor:"generator",
    markRepeat:true,
    scopePostfix:true,
    wrapFunction: "generatorFunction",
    storeResultCont:"$exit",
    keepLastPure:true,
    ops:{YieldExpression: true},
    keepLastRaise:true
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
    inlineScopeOp:"unwrap",
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
    inlineReentryCheck:true,
    inlineYieldOp:"iterator",
    inlineYieldStarOp:"iterator"
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
    inlineResultContAssign:false,
    storeResultCont:false,
    inlineRaiseOp:"promise"
  },
  asyncGenerators: {
    inlineResultContAssign:true,
    inlineErrorContAssign:true,
    inlineContAssign:true,
    storeCont:"step",
    storeErrorCont:"handle",
    storeResultCont:"$exit",
    inlineReentryCheck:false,
    inlineYieldOp:"iterator",
    inlineYieldStarOp:"iterator",
    inlineChainOp:"promise"
  }
}

const defunct = {
  effectful: {
    storeCont:"$step",
    defunct:true
  }
}

const defunctInline = {
  effectful: {
    markRepeat:false,
    inlineScopeOp:"unwrap",
    inlineJsExceptions:true,
    inlinePureJumps:"tail",
    storeCont:"$step",
    storeErrorCont:"$handle",
    inlineReentryCheck:false,
    inlineErrorContAssign:true,
    inlineContAssign:true,
    inlineChainOp:false,
    scopePrefix:true
  },
  async: {
    inlineScopeOp:"call"
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

const invertForOf = {
  generators: {
    inlineYieldOp:false,
    invertForOf:true,
    markRepeat:true,
    contextBy:"reference",
    finalizeForOf:true
  }
}

const topLevel = {
  file: {
    topLevel: true
  },
  all: {
    topLevel:true,
    contextBy: "this",
    contextState:true,
    wrapFunction: false
  },
  effectful: {
    inlineChainOp:false
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
    if (opts.defunct)
      p.push("defunct")
    if (opts.loose)
      p.push("loose")
    else if (opts.inline)
      p.push("inline")
    if (opts.delegateForOf)
      p.push("delegate")
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
  if (opts.inline || opts.loose) {
    Object.assign(generators,inline.all,
                  inline.effectful,inline.generators)
    Object.assign(async,inline.all,inline.effectful,inline.async)
    Object.assign(asyncGenerators,inline.all,inline.effectful,
                  inline.asyncGenerators)
  }
  if (opts.defunct) {
    Object.assign(generators,defunct.effectful)
    Object.assign(async,defunct.effectful)
    Object.assign(asyncGenerators,defunct.effectful)
    if (opts.inline) {
      Object.assign(generators,defunctInline.effectful)
      Object.assign(async,defunctInline.effectful,defunctInline.async)
      Object.assign(asyncGenerators,defunctInline.effectful)
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
  }
  if (opts.invertForOf) {
    Object.assign(generators,invertForOf.generators)
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
    main: Kit.pipe(
      function(si) {
        const sa = Kit.toArray(si)
        const root = sa[0].value
        let any
        for(const i of sa) {
          if (i.enter) {
            switch(i.type) {
            case Tag.File:
              i.value.opts = file
              break
            case Tag.ClassMethod:
            case Tag.ObjectMethod:
            case Tag.ArrowFunctionExpression:
            case Tag.FunctionExpression:
            case Tag.FunctionDeclaration:
              const {node} = i.value
              if (node.generator || node.async)
                any = true
              i.value.opts = node.generator
                ? (node.async ? asyncGenerators : generators)
                : (node.async ? async : pure)
              break
            }
          }
        }
        if (any || loose)
          T.run(Policy.propagateOpts(sa))
      }
    )
  }
}

