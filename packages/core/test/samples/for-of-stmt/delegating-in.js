// *- SKIP
M.profile("es")
M.option({inlineContAssign:true,
          state:false,
          inlineYieldOp:false,
          invertForOf:true,
          contextState:true,
          storeCont:true,
          markRepeat:true,
          storeErrorCont:true})

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

function* a5(i) {
  up: for(const i of some) {
    lo: for(const j of i) {
      try {
        switch (yield i) {
        case 1:
          continue
        case 2:
          continue up
        case 3:
          break lo
        case 4:
          return
        case 5:
          return 10
        case 6:
          break
        case 7:
          yield 7
          continue
        case 8:
          yield 8
          continue up
        case 9:
          yield 9
          break lo
        case 10:
          yield 10
          return
        case 11:
          yield 11
          return 10
        case 12:
          yield 12
          break
        }
      } finally {
        console.log("F")
      }
    }
  }
}


function* a5_1(i) {
  up: for(const i of some) {
    lo: for(const j of i) {
      switch (yield i) {
      case 1:
        continue
      case 2:
        continue up
      case 3:
        break lo
      case 4:
        return
      case 5:
        return 10
      case 6:
        break
      case 7:
        yield 7
        continue
      case 8:
        yield 8
        continue up
      case 9:
        yield 9
        break lo
      case 10:
        yield 10
        return
      case 11:
        yield 11
        return 10
      case 12:
        yield 12
        break
      }
    }
  }
}

function* a5_2(i) {
  up: for(const i of some) {
    lo: for(const j of i) {
      try {
        switch (yield i) {
        case 1:
          continue
        case 2:
          continue up
        case 3:
          break lo
        case 4:
          return
        case 5:
          return 10
        case 6:
          break
        case 7:
          yield 7
          continue
        case 8:
          yield 8
          continue up
        case 9:
          yield 9
          break lo
        case 10:
          yield 10
          return
        case 11:
          yield 11
          return 10
        case 12:
          yield 12
          break
        }
        yield i
      } finally {
        console.log("F")
      }
    }
  }
}

function* a5_2(i) {
  up: for(const i of some) {
    lo: for(const j of i) {
      try {
        switch (yield i) {
        case 1:
          continue
        case 2:
          continue up
        case 3:
          break lo
        case 4:
          return
        case 5:
          return 10
        case 6:
          break
        case 7:
          yield 7
          continue
        case 8:
          yield 8
          continue up
        case 9:
          yield 9
          break lo
        case 10:
          yield 10
          return
        case 11:
          yield 11
          return 10
        case 12:
          yield 12
          break
        }
        yield i
      } finally {
        yield "F"
      }
    }
  }
}


