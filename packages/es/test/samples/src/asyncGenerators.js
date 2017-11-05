
async function* ag1() {
  yield 1
}

async function* ag2() {
  yield await delay(1)
  yield await delay(2)
  yield await delay(3)
}

async function* ag3() {
  for await(const i of f()) {
    yield await delay(i)
    yield i
  }
}

