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

M.option({
  topLevel:false,
  defunct:true,
  inlineScopeOp:false,
  inlineErrorContAssign:false,
  inlineResultContAssign:false,
  inlineFork:"promise",
  inlinePureOp:"promise",
  inlineChainOp:"promise",
  inlineJsExceptions:false,
  storeRunningCont:"$cur",
  storeResultCont:false,
  contextMethodOps:true,
  contextMethodOpsSpec: { iterator:false },
  contextState:false,
  storeErrorCont:false
})

async function rt_seq_nc() {
  try {
    await a_1
    await a_2
  } catch(e) {
    await e_1
  }
}

async function rs_seq_nc() {
  let i = 0
  await hi(i)
  i++
  try {
    await a_1
    await a_3(await a_2)
    for(const j of something)
      await a_4(j)
  } catch(e) {
    await e
  } finally {
    await f_1
  }
  await m_1(i)
}

M.option({contextBy:"closure"})

async function rt_seq() {
  try {
    await a_1
    await a_2
  } catch(e) {
    await e_1
  }
}

async function rs_seq() {
  let i = 0
  await hi(i)
  i++
  try {
    await a_1
    await a_3(await a_2)
    for(const j of something)
      await a_4(j)
  } catch(e) {
    await e
  } finally {
    await f_1
  }
  await m_1(i)
}

M.option({leftChain:true})

async function lt_seq() {
  try {
    await a_1
    await a_2
  } catch(e) {
    await e_1
  }
}

async function ls_seq() {
  let i = 0
  await hi(i)
  i++
  try {
    await a_1
    await a_3(await a_2)
    for(const j of something)
      await a_4(j)
  } catch(e) {
    await e
  } finally {
    await f_1
  }
  await m_1(i)
}

/*
M.option({
  leftChain:false,
  par:true,
  parRegion:true,
  cleanupFrameVars:false
})

async function rt_par() {
  try {
    await a_1
    await a_2
  } catch(e) {
    await e_1
  }
}

async function rs_par() {
  let i = 0
  await hi(i)
  i++
  try {
    await a_1
    await a_3(await a_2)
    for(const j of something)
      await a_4(j)
  } catch(e) {
    await e
  } finally {
    await f_1
  }
  await m_1(i)
}

M.option({leftChain:true})

async function rt_par() {
  try {
    await a_1
    await a_2
  } catch(e) {
    await e_1
  }
}

async function rs_par() {
  let i = 0
  await hi(i)
  i++
  try {
    await a_1
    await a_3(await a_2)
    for(const j of something)
      await a_4(j)
  } catch(e) {
    await e
  } finally {
    await f_1
  }
  await m_1(i)
}
*/
