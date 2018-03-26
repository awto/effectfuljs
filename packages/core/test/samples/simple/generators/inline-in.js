M.profile("es")
M.option({
  scopeContext: true,
  state:false,
  contextState:true,
  static:true,
  scopeContext:true,
  scopePrefix:true
})

async function* a1() {
  if (yield 1)
    return (yield (await (yield 2)))
  yield* b
}

M.option({
  scopeContext: true,
  inlineChainOp:"promise",
  inlineScopeOp:"unwrap",
  inlineYieldOp:"iterator",
  inlineYieldStarOp:"iterator",
  inlinePureOp:"noop",
  inlineRaiseOp:"throw",
  inlinePureJumps:"call",
  inlineContAssign:true,
  inlineResultContAssign:true,
  inlineErrorContAssign:true,
  storeCont:"$step",
  storeResultCont:"$exit",
  storeErrorCont:"$handle"
})

async function* a2() {
  if (yield 1)
    return (yield (await (yield 2)))
  yield* b
}

M.option({
  defunct:true,
  inlineScopeOp:"call",
  inlineYieldOp:"iteratorResult",
  inlinePureOp:"iterator",
  inlineRaiseOp:"promise"
})

async function* a3() {
  if (yield 1)
    return (yield (await (yield 2)))
  yield* b
}

M.option({
  inlineScopeOp:"context",
  inlineYieldOp:"iteratorResultPromise",
  inlinePureOp:"promise",
  inlineJsExceptions:false
})

async function* a4() {
  if (yield 1)
    return (yield (await (yield 2)))
  yield* b
}

