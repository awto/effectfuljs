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
  if (yield 1) {
    const k = yield 2
    return (yield (await k))
  }
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
  if (yield 1) {
    const k = yield 2
    return (yield (await k))
  }
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
  if (yield 1) {
    const k = yield 2
    return (yield (await k))
  }
  yield* b
}

M.option({
  inlineScopeOp:"context",
  inlineYieldOp:"iteratorResultPromise",
  inlinePureOp:"promise",
  inlineJsExceptions:false
})

async function* a4() {
  if (yield 1) {
    const k = yield 2
    return (yield (await k))
  }
  yield* b
}


function* a5() {
  for(const i of b) {
    yield i
  }
}

async function* a6() {
  for await(const i of b) {
    yield i
  }
}


M.option({esForOf:true})

function* a7() {
  for(const i of b) {
    yield i
  }
}

async function* a8() {
  for await(const i of b) {
    yield i
  }
}

M.option({esForAwaitOf:true})

async function* a9() {
  for await(const i of b) {
    yield i
  }
}


