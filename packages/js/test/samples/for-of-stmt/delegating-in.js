M.profile("es")
M.option({storeCont:"$cont",
          inlineContAssign:true,
          state:false,
          inlineYieldOp:false,
          invertForOf:true,
          contextState:true})

function* a1() {
  for(const i of b())
    yield i
}

function* a2() {
  for(const i of b())
    yield i
  yield "f"
}

function* a3() {
  for(const i of b()) {
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
    for(const i of b()) {
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
