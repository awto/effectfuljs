module.exports = require("@effectful/js")
  .babelPreset({
    preset:"@effectful/es",
    directives:false,
    importRT: "@effectful/es-inline-rt",
    modules:"commonjs",
    scopeContext:true,
    contextState:false,
    contextMethodOps:true,
    markBindValue:false,
    markRec:false,
    markCatchCont:false,
    markArgNum:false,
    markErrorCont: true,
    markResultCont: true,
    contextBy:"reference",
    contFieldName:"step",
    resultContFieldName:"$exit",
    errorContFieldName:"handle",
    scopeContext:true,
    scopePrefix:true,
    contextState:false,
    jsExpceptions:true,
    state:false,
    inlineJsExceptions:true,
    inlinePureJumps:"call",
    contextMethodOpsSpec: {
      iterator: false,
      iteratorM: false,
      forInIterator: false
    },
    generators: {
      inlineResultContAssign:true,
      inlineErrorContAssign:true,
      inlineReentryCheck:true,
      keepLastPure:true,
      keepLastRaise:true,
      inlineScopeOp:"iterator",
      inlineYieldOp:"iterator",
      jsExpceptions:false
    },
    asyncGenerators: {
      inlineResultContAssign:true,
      inlineErrorContAssign:true,
      inlineReentryCheck:true,
      keepLastPure:true,
      keepLastRaise:true,
      inlineYieldOp:"iterator",
      inlineScopeOp:"asyncIterator",
      inlineChainOp:"promise"
    },
    async: {
      scopeContext:false,
      scopePrefix:false,
      inlinePureOp:"promise",
      inlineChainOp:"promise",
      inlineRaiseOp:"promise",
      inlineScopeOp:"promise",
      storeLastPure:false,
      storeLastRaise:false,
      keepLastPure:true,
      keepLastRaise:false
    }
  })

