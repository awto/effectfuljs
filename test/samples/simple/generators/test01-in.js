M.profile("generators")

function* d(i) {
  var j = 0;
  yield (yield i++,j++);
  if (yield (yield* some(i+=2,j) + j)) {
    return (yield* i+=3);
  } else if (j) {
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
  yield (yield* a2())
}  

function* a5() {
  for(const i of a4())
    yield i
}

function* cfb1() {
  for(let i = 0;;i++) {
    try {
      try { 
        if (yield i === 3)
          throw new Error(`AAAAAAAAA${i++}`)
        yield `a${i}`
      } finally {
        yield `f1${i++}`
      }
      yield `b${i++}`
    } catch(e) {
      yield `e${i}`
      yield e
      return i
    }
  }
}

