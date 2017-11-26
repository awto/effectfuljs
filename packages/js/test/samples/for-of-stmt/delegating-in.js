M.profile("es")
M.option({storeCont:"$cont",
          inlineContAssign:true,
          invertForOf:true,
          contextState:true,
          inlineYieldOp:"iterator"})

function* a1() {
  for(const i of b)
    yield i
}

function* a2() {
  for(const i of b)
    yield i
  yield "f"
}

function* a3() {
  for(const i of b) {
    yield i
    if (yield i++)
      continue
    if (yield i+=2)
      break
  }
  yield "f"
}

function* a4() {
  try {
    for(const i of ba) {
      try {
        yield i
      } catch(e) {
        yield e.message
      }
    }
  } catch(e) {
    yield e
  } finally {
    yield "f"
  }
  return r
}


