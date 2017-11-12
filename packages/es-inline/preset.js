var defunct = !!process.env.EJS_DEFUNCT

var opts = {
  preset:"@effectful/es",
  directives:false,
  importRT: "@effectful/es-inline-rt",
  contextBy:"reference",
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
  scopeContext:true,
  scopePrefix:true,
  contextState:false,
  inlineJsExceptions:true,
  defunct:defunct,
  inlinePureJumps:defunct ? "tail" : "call",
  inlineScopeOp:"unwrap",
  keepLastPure:true,
  keepLastRaise:true,
  contextMethodOpsSpec: {
    iterator: false,
    iteratorM: false,
    forInIterator: false
  },
  generators: {
    inlineResultContAssign:true,
    inlineErrorContAssign:true,
    inlineContAssign:true,
    storeCont:defunct ? "$cont" : "step",
    storeResultCont:"$exit",
    storeErrorCont:defunct ? "$handle" : "handle",
    inlineReentryCheck:!defunct,
    inlineYieldOp:"iterator"
  },
  asyncGenerators: {
    inlineResultContAssign:true,
    inlineErrorContAssign:true,
    inlineContAssign:true,
    storeCont:defunct ? "$cont" : "step",
    storeErrorCont:defunct ? "$handle" : "handle",
    storeResultCont:"$exit",
    inlineReentryCheck:false,
    inlineYieldOp:"iterator",
    inlineChainOp:!defunct && "promise"
  },
  async: {
    storeCont:defunct && "$cont" ,
    storeErrorCont:defunct && "$handle",
    inlineResultContAssign:false,
    inlineErrorContAssign:defunct,
    inlineContAssign:defunct,
    scopeContext:false,
    scopePrefix:defunct,
    inlinePureOp:"promise",
    inlineScopeOp:defunct && "call",
    inlineChainOp:!defunct && "promise",
    inlineResultContAssign:false,
    storeResultCont:false,
    inlineRaiseOp:"promise"
  }
}
module.exports = require("@effectful/js").babelPreset(opts)
