M.profile("disabled");
M.profile("generators");

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

function* a() {}

function* a1() {
  yield;
}

function* a3() {
  return yield;
}

function* a2() {
  yield 1;
}

function* a_1() {
  yield 1;
  try {
    yield 2;
  } catch (e) {
    yield e;
  }
}
function* d(i) {
  var j = 0;
  return yield yield i++, j++;
}

function* d2(i) {
  var j = 0;
  yield (yield i++, j++);
  if (yield yield* some((i += 2), j) + j) {
    return yield* (i += 3);
  } else {
    return i;
  }
  yield 2;
}
function* a4() {
  yield 1;
  try {
    yield 2;
    yield 3;
  } catch (e) {
    yield "excep";
    if (yield e) return 10;
  } finally {
    yield "f";
    yield "e";
  }
  yield a1(yield* a2(), yield* a3());
}

function* a5() {
  for (const i of a4()) yield i;
}
function* a6_1() {
  yield 1;
  try {
    yield 2;
    try {
      if (yield 3) return 10;
      yield 4;
    } finally {
      yield "f1";
    }
  } finally {
    yield "f2";
  }
  yield 5;
}

function* a1_2() {
  yield 1;
  return 2;
}

function* a2_1() {
  for (const i of a4()) yield i;
  yield 10;
}

function* a3_1() {
  for (const i of a4()) yield i;
}

function* a6() {
  let i = 0;
  for (;;) {
    if ((yield i++) === "exit") return 100;
  }
}

function* a7() {
  return (yield 1)
    ? (yield "A") && (yield "b")
    : (yield "c") || ((yield "d") && (yield "e"));
}

function* a7_1() {
  return yield ((yield 1)
    ? (yield "A") && (yield "b")
    : (yield "c") || ((yield "d") && (yield "e"))) + (yield 2);
}

function* a7_2() {
  yield ((yield 1)
    ? (yield "A") && (yield "b")
    : (yield "c") || ((yield "d") && (yield "e"))) + (yield 2);
  yield "ex";
}

function* a7_3() {
  (yield 1) % 2 ? (yield "A") && (yield "b") : yield "c";
  yield 2;
}
function* a7_4() {
  return yield yield 1 ? yield 2 : (yield 3, yield 4);
}

function* a7_5() {
  return yield (yield 1) ? yield 2 : yield 3;
}

function* a7_6() {
  return yield (yield 1) ? (yield "A") && (yield "b") : 1;
}
function* finallyBlock1() {
  let i = 0;
  try {
    for (;;) {
      if (yield i++ === 3) return;
    }
  } finally {
    yield "exit";
    yield i;
  }
}

function* ae() {
  yield 1;
  yield 2;
  if (yield 3) return 1;
  else return 2;
  yield 4;
}

function* cfb() {
  let i = 0;
  try {
    if (yield i++ === 3) throw new Error(`AAAAAAAAA${i++}`);
    yield `a${i++}`;
  } catch (e) {
    yield `e${i++}`;
    yield e;
    return i++;
  } finally {
    yield `f1${i++}`;
  }
}

function* cfb1_1() {
  let i = 0;
  try {
    yield i;
    throw new Error(`AAAAAAAAA${i++}`);
  } catch (e) {
    return i++;
  } finally {
    console.log(`f${i}`);
  }
}

function* cfb1() {
  let i = 0;
  try {
    yield i;
    yield 5;
  } catch (e) {
    return i++;
  }
}

function* cfb2_1() {
  let i = 0;
  try {
    try {
      yield `a:${i++}`;
      yield `b:${i++}`;
      yield `c:${i++}`;
    } finally {
      yield `f:${i++}`;
    }
  } catch (e) {
    yield e;
    yield `e:${i++}`;
  }
}

function* cfb3() {
  for (let i = 0; ; i++) {
    try {
      try {
        if (yield i === 3) throw new Error(`AAAAAAAAA${i++}`);
        yield `a${i}`;
      } finally {
        yield `f1${i++}`;
      }
      yield `b${i++}`;
    } catch (e) {
      yield `e${i}`;
      yield e;
      return i;
    }
  }
}

function* cfb4() {
  try {
    yield 5;
  } catch (e) {
    return 10;
  }
}

function* cfb2() {
  let i = 0;
  try {
    try {
      yield `c:${i++}`;
    } finally {
      yield `f:${i++}`;
    }
  } catch (e) {
    yield e;
    yield `e:${i++}`;
  }
}

function* cfb6() {
  try {
    yield 1;
  } catch (e) {
    yield 2;
    return 3;
  } finally {
    yield 4;
  }
}

function* fb4() {
  let i = 0;
  try {
    for (;;) {
      if ((yield i++) === 3) return i;
    }
  } finally {
    yield "exit";
    yield i;
  }
}

function* while2() {
  let i = 0;
  while ((yield i++) < 3) {
    yield i++;
  }
}

function* for2() {
  for (let i = yield; (yield i) < 10; i++) {
    yield i;
  }
}

function c1_1() {
  let i = 0;
  function* a() {
    function* b() {
      return function* c() {
        i++;
      };
      yield i;
      yield c1();
    }
  }
}

function c2_1() {
  let i = 0;
  function* inner() {
    function* a() {
      return (i += yield `a:${i}`);
    }
    const b = () => {
      function a() {
        i += 2;
        return i;
      }
      {
        let j = 10;
        function b() {
          i += j;
        }
        i++;
        return function* z() {
          const d = function z(j) {
            return (i += j);
          };
          function c() {
            return (i += this.something);
          }
          yield `b:${yield* d(c())}`;
          return function* z(j) {
            return (i += j + a() + b());
          };
        };
      }
    };
    let k = 1;
    const f = [a, b()];
    for (const j of f) {
      k += yield* j();
    }
    return k;
  }
  return inner;
}

function* c1() {
  let i = 0;
  return yield `a:${i}`;
}

function* c2_2() {
  let i = 0;
  return (i += yield `a:${i}`);
}

function* forOf() {
  for (const i of [1, 2, 3]) yield i;
}

const objMethods = {
  *a() {
    yield 10;
  },
  *b() {
    yield 1;
    yield this;
    yield arguments;
  }
};

const objM = {
  *objMethod() {
    yield 1;
  }
};

function* objMethodsClosure() {
  var i = 0,
    k = 0,
    m = 0;
  return {
    *objMethod1(k) {
      var j = 0;
      yield i++;
      yield k++;
      yield m++;
      return {
        *objMethod2(m) {
          yield j++;
          yield k++;
          yield m++;
        }
      };
    }
  };
}

const objMThis = {
  *[objMethod(a)]() {
    yield this;
    yield this;
    yield arguments[0];
  }
};

class SomeClass {
  *f(i) {
    yield i;
    yield arguments;
    yield this;
  }
}

class SomeChild extends SomeClass {
  *f(i) {
    yield i;
    yield arguments;
    yield* super[i](i);
  }
  static *f(i) {
    yield* super[i](i);
  }
}

function* clasClosure(A) {
  let cnt = 0;
  yield cnt++;
  {
    class B extends A {
      constructor() {
        cnt++;
      }
      static *f() {
        yield 1;
      }
    }
    yield* B.f();
  }
  class B extends A {
    constructor() {
      cnt += 2;
    }
    static *f() {
      yield (cnt += 2);
    }
  }
  const C = class extends A {
    static *f() {
      yield (cnt += 3);
      yield* B.f();
    }
  };
  yield (cnt += 3);
  yield* C.f();
  yield* B.f();
}

function* c2() {
  let i = 0;
  function* closure1_a() {
    return (i += yield `a`);
  }
  function closure1_b() {
    i++;
    function closure1_c() {
      i += 2;
      return i;
    }
    function closure1_d() {
      return closure1_c();
    }
    return closure1_c;
  }
  return closure1_b()();
}

function* loopCapt1() {
  for (let i = 0; i < 3; i++) {
    let j = 0;
    funs(function* iter() {
      yield `${i} ${j++}`;
    });
  }
}

function* loopCapt2() {
  for (let i = 0; i < 3; i++) {
    yield i;
    let j = i + 1;
    funs(function* iter() {
      yield j + i;
    });
  }
  yield "f";
}

function* loopCapt3() {
  for (let i = 0; i < 3; i++) {
    yield i;
    for (let j = 0; j < 3; j++) {
      yield j;
      funs(function* iter() {
        yield `${i} ${j++}`;
      });
    }
  }
}

function* loopCapt4() {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      funs(function* iter() {
        yield `${i} ${j++}`;
      });
    }
  }
}

function* forOfCapt1() {
  for (const i of a) {
    let j = 0;
    funs(function* iter() {
      yield `${i} ${j++}`;
    });
  }
}

function* forOfCapt2() {
  for (const i of a) {
    let j = 0;
    yield i;
    funs(function* iter() {
      yield `${i} ${j++}`;
    });
  }
}

function* forOfCapt3() {
  for (const i of a) {
    for (const j of b) {
      funs(function* iter() {
        yield `${i} ${j++}`;
      });
    }
  }
}

function* forOfCapt4() {
  for (const i of a) {
    for (const j of b) {
      yield j;
      funs(function* iter() {
        yield `${i} ${j++}`;
      });
    }
  }
}

function* forOfCapt5() {
  for (const i of a) {
    yield i;
    for (const j of b) {
      funs(function* iter() {
        yield `${i} ${j++}`;
      });
    }
  }
}

function* forOfCapt6() {
  for (const i of a) {
    yield i;
    for (const j of b) {
      yield i;
      funs(function* iter() {
        yield `${i} ${j++}`;
      });
    }
  }
}

function* forIn() {
  for (let i in { a: 1 }) yield i;
}

function* while1() {
  let i = 0;
  while ((yield i++) < 3) {
    yield i++;
  }
  i = 0;
}

function* catchBlock2() {
  for (let i = 0; ; i++) {
    try {
      if (yield i === 3) throw new Error(`AAAAAAAAA${i++}`);
      yield `a${i}`;
    } catch (e) {
      yield `e${i}`;
      yield e;
      return i;
    }
  }
}

function* closure2() {
  var k = 0,
    j = 1,
    m = 0;
  yield k++ + j + m++;
  yield m++;
  return function* sub(k) {
    yield k++, j;
  };
}

function* switches() {
  if (a) yield 1;
  switch (a) {
    case 1:
      yield 2;
      yield 3;
    case 2:
      console.log(3);
    default:
      console.log(4);
  }
  f1: for (let i = 0; ; i++) {
    switch (i) {
      case 3:
        break f1;
    }
  }
  f2: for (let i = 0; ; i++) {
    switch (i) {
      case 3:
        break f2;
    }
    yield `f2-${i}`;
  }
  l1: for (const i of gen()) {
    switch (i) {
      case 3:
        break l1;
    }
  }
  l2: for (const i of gen()) {
    switch (i) {
      case 3:
        yield `l2-${i}`;
        break l2;
      default:
        continue;
    }
  }
  l3: for (const i of gen()) {
    switch (i) {
      case 3:
        break l3;
      default:
        yield `l3-${i}`;
        continue;
    }
  }
  l4: for (const i of gen()) {
    switch (i) {
      case 3:
        break l4;
    }
    yield `l4-${i}`;
  }
  l5: for (const i of gen()) {
    yield `l5-${i}`;
    switch (i) {
      case 3:
        break l5;
    }
  }
  l6: for (const i of gen()) {
    switch (i) {
      case 3:
        yield `l6-1-${i}`;
        break l6;
      default:
        yield `l6-2-${i}`;
        continue;
    }
  }
  l7: for (const i of gen()) {
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
  up: for (const i of gen()) {
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
