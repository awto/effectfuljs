exports.notGenerator = function() {
  return [];
};

exports.simple1 = function*() {};

exports.simple2 = function*() {
  yield;
};

exports.simple3 = function*() {
  return yield yield yield (yield yield) + (yield yield);
};

exports.simple4 = function*() {
  yield 1;
  yield 2;
  yield 3;
};

exports.simple5 = simple5;
function* simple5() {
  yield 1;
  yield 2;
  yield 3;
  return 10;
}

exports.simple6 = function*() {
  yield 1;
  yield 2;
  yield 3;
  yield yield* exports.simple5();
};

exports.simple7 = function*() {
  yield 1;
  try {
    yield 2;
    yield 3;
  } catch (e) {
    yield "excep";
    yield e;
  } finally {
    yield "f";
  }
  yield yield* exports.simple5();
};

exports.simple8 = function*() {
  for (const i of exports.simple5()) yield i;
};

exports.delegateSimple = function* delegate() {
  yield* "abc";
  yield* [1, 2, 3, 4];
};

exports.finallyBlock1 = function*() {
  let i = 0;
  try {
    for (;;) {
      if ((yield i++) === 3) return;
    }
  } finally {
    yield "exit";
    yield i;
  }
};

exports.finallyBlock2 = function*() {
  let i = 0;
  try {
    for (;;) {
      if ((yield i++) === 3) break;
      yield "iter";
    }
  } finally {
    yield "exit";
    yield i;
  }
  try {
    for (;;) {
      if ((yield i++) === 6) break;
      yield "iter";
    }
  } finally {
    yield i;
  }
  yield "exit" + i;
};

exports.finallyBlock3 = function*() {
  let i = 0;
  try {
    l1: {
      try {
        l2: {
          try {
            try {
              for (;;) if ((yield i++) === 3) break l1;
              yield "after-iter-" + i;
            } finally {
              yield "f1.1-" + i;
              yield "f1.2-" + i++;
              break l2;
            }
            yield "after-f1";
          } finally {
            yield "f2.1-" + i;
            yield "f2.2-" + i++;
          }
          yield "last-l2";
        }
        yield "after-l2";
      } finally {
        yield "f3";
        yield i++;
      }
      yield "last-l1";
    }
    yield "after-l1";
  } finally {
    yield "f4";
    yield i;
  }
  yield "exit";
};

exports.finallyBlock4 = function*() {
  let i = 0;
  try {
    for (;;) {
      if ((yield i++) === 3) return i;
    }
  } finally {
    yield "exit";
    yield i;
  }
};

exports.catchBlock1 = function*() {
  for (;;) {
    try {
      if (yield "i" === 3) throw new Error("AAAAAAAAA");
      yield "c";
    } catch (e) {
      yield "e";
      yield e;
      return 10;
    }
  }
};

exports.catchBlock2 = function*() {
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
};

exports.catchFinallyBlock1 = function*() {
  for (let i = 0; ; i++) {
    try {
      if (yield `s${i}` === 3) throw new Error(`AAAAAAAAA${i++}`);
      yield `a${i++}`;
    } catch (e) {
      yield `e${i++}`;
      yield e;
      return i++;
    } finally {
      yield `f1${i++}`;
    }
  }
};

exports.catchFinallyBlock2 = function*() {
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
};

exports.catchFinallyBlock3 = function*() {
  try {
    yield 1;
    throw new Error(`AAAAAAAAA`);
    yield 2;
  } catch (e) {
    yield 3;
    return 4;
    yield 5;
  } finally {
    yield 6;
  }
};

exports.whileLoops = function*() {
  let i = 0;
  while ((yield i++) < 3) {
    yield `a${i++}`;
  }
  i = 0;
  do {
    yield `b${i++}`;
  } while ((yield `c${i++}`) < 6);
  i = 0;
  while (yield `d${i++}` < 12) {
    if ((yield `e${i++}`) > 15) return 10;
  }
};

exports.forStmt = function*() {
  for (let i = 0; i < 3; i++) {
    yield i;
  }
  for (let i = yield; (yield i) < 10; i++) {
    yield i;
  }
  for (let i = 0; i < 20; i++) {
    if (i % 2) continue;
    yield i;
  }
  l1: for (let i = 0; i < 20; i++) {
    for (let j = 0; j < 20; j++) {
      if (i % 2 && j % 2) continue l1;
      if (i % 2) continue;
      yield i + j;
    }
  }
  l2: for (let i = 0; i < 20; i++) {
    for (let j = 0; j < 20; j++) {
      if (j === 10) break l2;
      if (i === 10) break;
      yield i + j;
    }
  }
};

exports.loopsRepeatTailJump = function*() {
  for (let i = 0; i < 200000; i++) {
    if (i < 2) yield `a:${i}`;
    if (i > 199800) yield `b:${i}`;
  }
  for (let i = 0; i < 200000; i++) {
    if (i < 192000) continue;
    yield `c:${i}`;
  }
};

exports.closure1 = function*() {
  let i = 0;
  function* closure1_a() {
    return (i += yield `a:${i}`);
  }
  function closure1_b() {
    i++;
    function closure1_c() {
      i += 2;
      return i;
    }
    function* a() {
      function d(j) {
        return (i += j);
      }
      yield `b:${d(closure1_c())}`;
      return i;
    }
    return a;
  }
  const f = [closure1_a, closure1_b()];
  let k = 0;
  k += (yield* f[0]()) + (yield* f[1]());
  var b = 1,
    o = { b: 1 };
  var bnum = 0;
  function getB() {
    bnum++;
    return "b";
  }
  function* a() {
    return (o[getB()] += yield o.b);
  }
  const j = a();
  yield j.next();
  o.b = 100;
  yield j.next(10);
  yield o.b;
  yield `bnum:${bnum}`;
  return k;
};

exports.forOfStmt = function*() {
  for (const i of [1, 2, 3]) yield i;
  for (const i of exports.simple5()) yield i;
  for (const i of exports.simple5()) {
    yield i;
    if (i === 2) break;
  }
  for (const i of exports.simple5()) {
    if (i === 2) continue;
    yield i;
    if (i === 3) return yield "r";
  }
};

exports.forInStmt = function*() {
  for (const i in { a: 1, b: 2, c: 3 }) yield i;
};

exports.objMethods = function*() {
  let i = 0,
    j = 10,
    k = 0;
  let o = {
    *a1() {
      yield (i += j);
      return {
        *a2(j) {
          yield (i += j);
          return i;
        }
      };
    },
    a3(j) {
      k += j;
      return {
        *a4(k) {
          yield (k += j);
          return i;
        }
      };
    },
    a5() {
      return {
        *a6(j) {
          yield (k += j);
          return i;
        }
      };
    }
  };
  return (
    (yield* (yield* o.a1()).a2(100)) +
    (yield* o.a3(10).a4(1000)) +
    (yield* o.a5().a6(10000)) +
    i +
    j +
    k
  );
};

exports.forBlockScope = function* forBlockScope() {
  const funs = [];
  for (let i = 0; i < 3; i++) {
    let j = i;
    funs.push(function* iter() {
      yield "fb1:" + j;
    });
  }
  for (var j = 0; j < 3; j++) {
    var k = j;
    funs.push(function* iter() {
      yield `fb2: ${k + j} `;
    });
  }
  for (let i = 0; i < 3; i++) {
    yield `fb3: ${i} `;
    let j = i;
    funs.push(function* iter() {
      yield `fb3-1: ${j} `;
    });
  }
  for (var i = 0; i < 3; i++) {
    yield `fb4:${i}`;
    let j = i;
    funs.push(function* iter() {
      yield `fb5: ${j} `;
    });
  }
  for (let i = 0; i < 3; i++) {
    yield `fb6:${i}`;
    for (let j = 0; j < 3; j++) {
      let j = i;
      funs.push(function* iter() {
        yield `fb7: ${j} `;
      });
    }
  }
  for (let i = 0; i < 3; i++) {
    yield `fb8: ${i} `;
    for (let j = 0; j < 3; j++) {
      let j = i;
      yield `fb9: ${j} `;
      funs.push(function* iter() {
        yield `fb10: ${j} `;
      });
    }
  }
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let j = i;
      yield `fb11: ${j} `;
      funs.push(function* iter() {
        yield `fb12: ${j++} `;
      });
    }
  }
  for (const i of funs) yield* i();
};

exports.forOfBlockScope = function* forOfBlockScope() {
  let a = [1, 2, 3, 4, 5, 6, 7, 8];
  let b = [10, 11, 12, 13, 14, 15, 16];
  const funs = [];
  for (const i of a) {
    let j = 0;
    funs.push(function* iter() {
      yield `fo1: ${i} ${j++}`;
    });
  }
  for (var i of a) {
    var j = 0;
    funs.push(function* iter() {
      yield `fo2: ${i} ${j++}`;
    });
  }
  for (const i of a) {
    for (let j of b) {
      funs.push(function* iter() {
        yield `fo3: ${i} ${j++}`;
      });
    }
  }
  for (const i of a) {
    for (let j of b) {
      yield `fo4: ${j}`;
      funs.push(function* iter() {
        yield `fo5: ${i} ${j++}`;
      });
    }
  }
  for (const i of a) {
    yield `fo6: ${i}`;
    for (let j of b) {
      funs.push(function* iter() {
        yield `fo7: ${i} ${j++}`;
      });
    }
  }
  for (const i of a) {
    yield `fo8 ${i}`;
    for (let j of b) {
      yield `fo9: ${i}`;
      funs.push(function* iter() {
        yield `fo10: ${i} ${j++}`;
      });
    }
  }
  for (const i of funs) yield* i();
  funs.length = 0;
  for (const i of a) {
    funs.push(function* iter() {
      yield `fo11: ${i}`;
    });
  }
  for (const i of a) {
    yield `fo12 ${i}`;
    funs.push(function* iter() {
      yield `fo13 ${i}`;
    });
  }
  let k = 0;
  for (const i of a) {
    yield `fo14 ${i} ${k} {m}`;
    let m = k;
    k++;
    if (k === 3) continue;
    if (k === 5) break;
    funs.push(function* iter() {
      yield `fo15 ${i} ${k} {m}`;
    });
  }
  k = 0;
  up1: for (const i of a) {
    let m = k;
    k++;
    for (const j of b) {
      let n = m;
      m++;
      if (k === 3) continue up1;
      if (k === 5) break up1;
      if (n === 3) continue;
      if (n === 5) break;
      funs.push(function* iter() {
        n++;
        yield `fo18: ${i} ${j} ${k} ${m} ${n}`;
      });
    }
  }
  k = 0;
  up2: for (const i of a) {
    let m = 0;
    k++;
    yield `fo16: ${i} ${k} ${m}`;
    for (const j of b) {
      let n = m;
      m++;
      if (k === 3) continue up2;
      if (k === 5) break up2;
      if (n === 3) continue;
      if (n === 5) break;
      funs.push(function* iter() {
        n++;
        yield `fo18: ${i} ${j} ${k} ${m} ${n}`;
      });
    }
  }
  k = 0;
  up3: for (const i of a) {
    let m = 0;
    k++;
    for (const j of b) {
      let n = m;
      m++;
      yield `fo19 ${i} ${j} ${k} ${m} ${n}`;
      if (k === 3) {
        continue up3;
      }
      if (k === 5) break up3;
      if (n === 3) continue;
      if (n === 5) break;
      funs.push(function* iter() {
        n++;
        yield `fo20: ${i} ${j} ${k} ${m} ${n}`;
      });
    }
  }
  bl1: {
    let k = 0;
    yield `fo21: ${i} ${k}`;
    up4: for (const i of a) {
      let m = 0;
      k++;
      yield `fo22: ${i} ${k} ${m}`;
      for (const j of b) {
        let n = m;
        m++;
        yield `fo23 ${i} ${j} ${k} ${m} ${n}`;
        if (k === 3) continue up4;
        if (k === 5) break bl1;
        if (n === 3) continue;
        if (n === 5) break;
        funs.push(function* iter() {
          n++;
          yield `fo24: ${i} ${j} ${k} ${m} ${n}`;
        });
      }
    }
  }
  bl2: {
    let k = 0;
    yield `fo25`;
    up5: for (const i of a) {
      let m = 0;
      k++;
      yield `fo26: ${i} ${k} ${m}`;
      for (const j of b) {
        let n = m;
        m++;
        yield `fo27 ${i} ${j} ${k} ${m} ${n}`;
        if (k === 3) continue up5;
        if (k === 5) break bl2;
        if (n === 3) continue;
        if (n === 5) break;
        funs.push(function* iter() {
          n++;
          yield `fo28: ${i} ${j} ${k} ${m} ${n}`;
        });
      }
    }
  }
  bl3: {
    let k = 0;
    up6: for (const i of a) {
      let m = 0;
      k++;
      yield `fo29: ${i} ${k} ${m}`;
      for (const j of b) {
        let n = m;
        m++;
        yield `fo30 ${i} ${j} ${k} ${m} ${n}`;
        if (k === 3) continue up6;
        if (k === 5) {
          for (const i of funs) yield* i();
          return `r: ${i} ${j} ${k} ${m} ${n}`;
        }
        if (n === 3) continue;
        if (n === 5) break;
        funs.push(function* iter() {
          n++;
          yield `fo31: ${i} ${j} ${k} ${m} ${n}`;
        });
      }
    }
  }
  yield "never";
};

exports.whileBlockScope = function* whileBlockScope() {
  const funs = [];
  while ((yield) < 3) {
    const i = yield;
    funs.push(function* iter() {
      yield i;
    });
  }
  while ((yield) < 6) {
    var i = yield;
    funs.push(function* iter() {
      yield i;
    });
  }
  while ((yield) < 6) {
    let i = 10;
    funs.push(function* iter() {
      yield i++;
    });
  }
  do {
    const i = yield;
    funs.push(function* iter() {
      yield i;
    });
  } while ((yield) < 3);
  do {
    let i = 0;
    funs.push(function* iter() {
      yield i++;
    });
  } while ((yield) < 6);
  for (const i of funs) {
    yield* i();
  }
};

exports.generatorsMethods = function* generatorsMethods() {
  function* e() {
    for (let i = 0; ; i++) yield i;
  }
  let g = e();
  try {
    for (const i of g) {
      yield i;
      if (i === 3) {
        yield g.throw("e");
      }
    }
  } catch (e) {
    yield e;
  }
  g = e();
  let stop = false;
  for (const i of g) {
    yield i;
    yield stop;
    if (stop) return;
    if (i === 3) {
      yield g.return("r");
      stop = true;
    }
  }
};

exports.switches = function* b() {
  function* gen() {
    for (let i = 0; ; i++) yield i;
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
};

function* gen1() {
  for (let i = 0; i < 3; i++) yield "a:" + i;
  return 100;
}

function* wrap1() {
  yield "a-1";
  yield yield* gen1();
  yield "a-2";
  yield* Array.from(gen1());
  yield "a-3";
  yield* new Set(gen1());
  yield "a-3";
  return (yield* gen1()) * 10;
}

function* wrap2() {
  for (const i of wrap1()) {
    yield "b:" + i;
    yield "b1:" + i;
  }
  yield "ar";
  let v;
  for (var i = wrap1()[Symbol.iterator](); !(v = i.next()).done; ) {
    yield "b2:" + v.value;
  }
  yield "br:" + v.value;
}

exports.transducers1 = function* transducers1() {
  for (const i of wrap2()) {
    yield "c:" + i;
  }
  yield "EXIT";
};

function* gen2() {
  yield 1;
  yield 2;
  yield* [3, 4];
  yield* new Set([5, 6]);
  return 7;
}

function* transpiler1() {
  for (const i of [10, 20, 30]) {
    yield i + 100;
  }
  for (const i of new Set([10, 20, 30])) {
    yield i + 200;
  }
  for (const i of gen2()) {
    yield i + 300;
  }
  yield* gen2();
  return 100;
}

function* transpiler2() {
  for (const i of transpiler1()) {
    yield i * 10;
    yield i * 20;
  }
  yield yield* transpiler1();
  return 101;
}

exports.transducers2 = function* transducers2() {
  yield yield* transpiler2();
  yield* ["a", "b", "c"];
  yield* new Set(["d", "e", "f"]);
  yield "Exit";
};

exports.delegateOfDelegate1 = function* delegateOfDelegate1() {
  function* s1() {
    return yield* gen2();
  }
  function* s2() {
    for (const i of s1()) {
      yield i;
    }
  }
  function* s3() {
    yield* [10, 20, 30, 40];
    yield yield* s1();
    return yield* s2();
  }
  function* s4() {
    yield yield* s3();
    return yield* s3();
  }
  yield yield* s4();
};

exports.delegateOfDelegate2 = function* delegateOfDelegate2() {
  for (const i of exports.delegateOfDelegate1()) yield i;
};

exports.simpleInvert0 = simpleInvert0;
function* simpleInvert0() {
  yield* [1, 2];
  for (const i of [1, 2]) {
    yield `a:${i}`;
  }
  for (const i of [1, 2]) {
    yield* ["A" + i, "B" + i];
    yield* ["C" + i, "D" + i];
  }
  yield* new Set([1, 2]);
  for (const i of new Set([1, 2])) {
    yield `E:${i}`;
  }
  for (const i of new Set([1, 2])) {
    yield* new Set(["z" + i, "x" + i]);
    yield* new Set(["Z" + i, "X" + i]);
  }
  for (const i of simple5()) {
    yield i;
  }
  yield* simple5();
  for (const i of simple5()) {
    yield* simple5();
    yield* simple5();
  }
  for (const i of simple5()) {
    for (const j of simple5()) {
      yield `a:${i}-${j}`;
    }
  }
  for (const i of simple5()) {
    for (const j of simple5()) {
      for (const k of simple5()) {
        yield `b:${i}-${j}-${k}`;
      }
    }
  }
  for (const i of simple5()) {
    for (const j of simple5()) {
      for (const k of simple5()) {
        yield `c:${i}-${j}-${k}`;
      }
      yield `d:${i}-${j}`;
    }
    yield `e:${i}`;
  }
  for (const i of simple5()) {
    yield `f:${i}`;
    for (const j of simple5()) {
      yield `g:${i}-${j}`;
      for (const k of simple5()) {
        yield `h:${i}-${j}-${k}`;
      }
    }
  }
  for (const i of simple5()) {
    yield* [i + 100];
  }
  for (const i of [1, 2]) {
    yield* simple5();
  }
}

exports.simpleInvert1 = function* simpleInvert1() {
  for (const i of simpleInvert0()) {
    yield* ["X" + i];
    yield* ["X" + i];
  }
  for (const i of [1, 2]) {
    yield* simpleInvert0();
    yield* simpleInvert0();
  }
  for (const i of simpleInvert0()) {
    for (const j of simpleInvert0()) {
      yield `Y1:${i}-${j}`;
      yield `Z1:${i}-${j}`;
    }
    for (const j of simpleInvert0()) {
      yield `Y2:${i}-${j}`;
      yield `Z2:${i}-${j}`;
    }
  }
};
