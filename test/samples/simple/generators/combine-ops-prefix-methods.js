M.profile("generators")
M.option({combineOps:true,
          scopePrefix:true,
          contextMethodOps:true})

function* d(i) {
  var j = 0;
  yield (yield i++,j++);
  if (yield (yield* some(i+=2,j) + j)) {
    return (yield* i+=3);
  } else {
    return i
  }
  yield 2;
}

function* a4() {
  yield 1
  try {
    yield 2
    yield 3
  } catch(e) {
    yield "excep"
    yield e
  } finally {
    yield "f"
    yield "e"
  }
  yield a1(yield* a2(), yield* a3())
} 

function* a5() {
  for(const i of a4())
    yield i
}
