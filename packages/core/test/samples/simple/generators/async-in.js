M.profile("es");

M.option({
  combineOps: true,
  scopeContext: true,
  scopePrefix: true,
  contextState: true,
  contextMethodOps: true,
  markArgNum: false,
  markBindValue: false,
  markRec: false,
  markCatchCont: false
});

async function a1() {}

async function a2() {
  await delay(1);
}

async function a3() {
  return await delay(1);
}

function* g2() {
  yield* delay(1);
}

function* g3() {
  return yield* delay(1);
}

async function a4() {
  await await delay(1);
}

async function a5() {
  await await await delay(1);
}

async function* ag1() {
  yield 1;
}

async function* ag2() {
  yield await delay(1);
  yield await delay(2);
  yield await delay(3);
}

async function* ag3() {
  for await (const i of f()) {
    yield await delay(i);
    yield i;
  }
}

async function* switches() {
  l1: for await (const i of gen()) {
    switch (i) {
      case 3:
        break l1;
    }
  }
  l2: for await (const i of gen()) {
    switch (i) {
      case 3:
        yield `l2-${i}`;
        break l2;
      default:
        continue;
    }
  }
  l3: for await (const i of gen()) {
    switch (i) {
      case 3:
        break l3;
      default:
        yield `l3-${i}`;
        continue;
    }
  }
  l4: for await (const i of gen()) {
    switch (i) {
      case 3:
        break l4;
    }
    yield `l4-${i}`;
  }
  l5: for await (const i of gen()) {
    yield `l5-${i}`;
    switch (i) {
      case 3:
        break l5;
    }
  }
  l6: for await (const i of gen()) {
    switch (i) {
      case 3:
        yield `l6-1-${i}`;
        break l6;
      default:
        yield `l6-2-${i}`;
        continue;
    }
  }
  l7: for await (const i of gen()) {
    switch (i) {
      case 0:
        continue;
      case 1:
      case 2:
        yield `l7-1-${i}`;
      case 3:
        continue;
      case 4:
        yield `l7-2-${i}`;
        continue l7;
      case 5:
        yield `l7-3-${i}`;
        break;
      case 6:
        continue l7;
      case 7:
        yield `l7-4-${i}`;
        break l7;
      default:
        yield `l7-5-${i}`;
    }
    yield `l7-6-${i}`;
  }
  up: for await (const i of gen()) {
    inner: for (const j of gen()) {
      switch (i) {
        case 0:
        case 1:
        case 2:
          yield `s1:${i},${j}`;
          if (j > 3) break inner;
          break;
        case 3:
          switch (j) {
            case 2:
            case 3:
              yield `s2:${i},${j}`;
              break;
            case 5:
              yield `s3:${i},${j}`;
              continue;
            case 7:
              yield `s4:${i},${j}`;
              break;
            case 8:
              yield `s5:${i},${j}`;
              continue inner;
            case 9:
              yield `s6:${i},${j}`;
              break inner;
            default:
              break;
          }
          break;
        case 4:
          switch (j) {
            case 2:
            case 3:
              yield `s7:${i},${j}`;
              break;
            case 5:
              yield `s8:${i},${j}`;
              continue;
            case 6:
              continue up;
            case 7:
              yield `s9:${i},${j}`;
              break;
            case 8:
              yield `s10:${i},${j}`;
              continue inner;
            case 9:
              yield `s11:${i},${j}`;
              break up;
            default:
              yield `s12:${i},${j}`;
              break;
          }
          yield `s13:${i},${j}`;
          break;
        case 5:
          switch (j) {
            case 2:
            case 3:
              break up;
          }
      }
    }
  }
}

async function* c() {
  yield 1;
  lo: for (const i of somethng) {
    for await (const j of somethingElse) {
      switch (yield i) {
        case 1:
          return 10;
        case 2:
          break;
        case 3:
          continue;
        case 5:
          continue lo;
        case 6:
          break lo;
      }
      break;
    }
  }
}

class A {
  async method() {
    await something;
  }
  static async method() {
    await somethingElse;
  }
}

var b = new class {
  async method() {
    await something;
  }
  static async m1() {
    await somethingElse;
    class A {
      async m2() {
        await something;
      }
    }
  }
}();

var c = new class C {
  async [getName()]() {
    await something;
  }
  static async [Symbol.iterator]() {
    await somethingElse;
  }
}()(async i => await i)(10);
(async function(i) {
  var f = await i;
})(10);
(async function zz(i) {
  await i;
})(10);
