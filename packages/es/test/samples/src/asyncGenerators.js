
exports.ag1 = ag1
async function* ag1() {
  yield 1
}

exports.ag2 = ag2
async function* ag2() {
  yield await delay(1)
  yield await delay(2)
  yield await delay(3)
  return 100
}

exports.ag3 = ag3
async function* ag3() {
  for await(const i of ag2()) {
    yield await delay(i)
    yield i
  }
}

exports.agStar = agStar
async function* agStar() {
  yield* [1,2,3]
  return yield* ag2()
}

exports.agPure = agPure
async function* agPure() {
  for await(const i of ["a","b","c"])
    yield i
}
