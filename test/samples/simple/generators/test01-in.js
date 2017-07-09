M.profile("generators")

function* a() {
  yield (yield 1);
  if (yield (yield* some())) {
    return (yield* some);
  } else {
    return
  }
  yield 2;
}

M.option({combineOps:true,
          scopePrefix:false,
          scopeContext:false})

function* b() {
  yield (yield 1);
  if (yield (yield* some())) {
    return (yield* some);
  } else {
    return
  }
  yield 2;
}

M.option({combineOps:false,
          scopePrefix:true,
          scopeContext:true})

function* c() {
  yield (yield 1);
  if (yield (yield* some())) {
    return (yield* some);
  } else {
    return
  }
  yield 2;
}

M.option({combineOps:true,
          scopePrefix:true,
          scopeContext:false})

function* d() {
  yield (yield 1);
  if (yield (yield* some())) {
    return (yield* some);
  } else {
    return
  }
  yield 2;
}

M.option({combineOps:true,
          scopePrefix:true,
          contextMethodOps:true})

function* d() {
  yield (yield 1);
  if (yield (yield* some())) {
    return (yield* some);
  } else {
    return
  }
  yield 2;
}

