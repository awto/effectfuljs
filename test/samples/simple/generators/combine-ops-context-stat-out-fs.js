function a() {
  var ctx = M.generator();
  return ctx.scopeBH(_1);

  function _1(ctx) {
    return ctx.pure(ctx);
  }
}

function a1() {
  var ctx = M.generator();
  return ctx.scopeBH(_1);

  function _1(ctx) {
    return ctx.yldBH(undefined, _2);
  }

  function _2(ctx) {
    return ctx.pure(ctx);
  }
}

function a3() {
  var ctx = M.generator();
  return ctx.scopeBH(_1);

  function _1(ctx) {
    return ctx.yldBH(undefined, ctx.pure);
  }
}

function a2() {
  var ctx = M.generator();
  return ctx.scopeBH(_1);

  function _1(ctx) {
    return ctx.yldBH(1, _2);
  }

  function _2(ctx) {
    return ctx.pure(ctx);
  }
}

function _a() {
  var e,
      ctx = M.generator();
  return ctx.scopeBH(_1);

  function _1(ctx) {
    return ctx.yldBH(1, _2);
  }

  function _2(ctx) {
    try {
      return ctx.yldBH(2, _4, _3);
    } catch (ex) {
      return _3(ctx, ex);
    }
  }

  function _3(ctx, ex) {
    e = ex;
    return ctx.yldBH(e, _4);
  }

  function _4(ctx) {
    return ctx.pure(ctx);
  }
}

function d(i) {
  var ctx = M.generator();
  return ctx._i = i, ctx.scopeBH(_1);

  function _1(ctx) {
    var i = ctx._i,
        j,
        a;
    j = 0;
    a = i++;
    return ctx._i = undefined, ctx._j = j, ctx.yldBH(a, _2);
  }

  function _2(ctx, a) {
    return ctx.yldBH(a, _3);
  }

  function _3(ctx) {
    var j = ctx._j;
    return ctx.pure(ctx, j++);
  }
}

function d2(i) {
  var ctx = M.generator();
  return ctx._i = i, ctx.scopeBH(_1);

  function _1(ctx) {
    var i = ctx._i,
        j,
        a;
    j = 0;
    a = i++;
    return ctx._i = i, ctx._j = j, ctx.yldBH(a, _2);
  }

  function _2(ctx) {
    var j = ctx._j,
        a;
    a = j++;
    return ctx._j = j, ctx.yldBH(a, _3);
  }

  function _3(ctx) {
    var i = ctx._i,
        j = ctx._j,
        a,
        b;
    b = i += 2;
    a = some(b, j);
    return ctx._j = undefined, ctx._i = i, ctx.yldStarBH(a + j, _4);
  }

  function _4(ctx, a) {
    return ctx.yldBH(a, _5);
  }

  function _5(ctx, a) {
    var i = ctx._i;
    if (a) return _6(ctx);else {
      return ctx.pure(ctx, i);
    }
  }

  function _6(ctx) {
    var i = ctx._i,
        a;
    a = i += 3;
    return ctx._i = undefined, ctx.yldStarBH(a, _7);
  }

  function _7(ctx, a) {
    return ctx.pure(ctx, a);
  }

  function _8(ctx) {
    return ctx.yldBH(2, _9);
  }

  function _9(ctx) {
    return ctx.pure(ctx);
  }
}

function a4() {
  var e,
      ctx = M.generator();
  return ctx.scopeBH(_1);

  function _1(ctx) {
    return ctx.yldBH(1, _2);
  }

  function _2(ctx) {
    try {
      return ctx.yldBH(2, _3, _4);
    } catch (ex) {
      return _4(ctx, ex);
    }
  }

  function _3(ctx) {
    try {
      return ctx._cb = _10, ctx.yldBH(3, _8, _4);
    } catch (ex) {
      return _4(ctx, ex);
    }
  }

  function _4(ctx, ex) {
    e = ex;
    return ctx.yldBH('excep', _5);
  }

  function _5(ctx) {
    return ctx.yldBH(e, _6);
  }

  function _6(ctx, a) {
    if (a) return _7(ctx);else return ctx._cb = _10, _8(ctx);
  }

  function _7(ctx) {
    return ctx._r = 10, ctx._cb = r_, _8(ctx);
  }

  function _8(ctx) {
    return ctx.yldBH('f', _9);
  }

  function _9(ctx) {
    var cb = ctx._cb;
    return ctx._cb = undefined, ctx.yldBH('e', cb);
  }

  function _10(ctx) {
    var a;
    a = _a2();
    return ctx.yldStarBH(a, _11);
  }

  function _11(ctx, b) {
    var a;
    a = _a3();
    return ctx._12 = b, ctx.yldStarBH(a, _12);
  }

  function _12(ctx, c) {
    var a,
        b = ctx._12;
    a = _a1(b, c);
    return ctx._12 = undefined, ctx.yldBH(a, _13);
  }

  function _13(ctx) {
    return ctx.pure(ctx);
  }

  function r_(ctx) {
    var r = ctx._r;
    return ctx.pure(ctx, r);
  }
}

function a5() {
  var i,
      ctx = M.generator();
  return ctx.scopeBH(_1);

  function _1(ctx) {
    var loop;
    loop = ctx.iterator(a4());
    return ctx._loop = loop, _2(ctx);
  }

  function _2(ctx) {
    var loop = ctx._loop,
        a,
        b;
    b = loop.incr();
    a = loop = b;
    if (!a.done) return ctx._loop = loop, _3(ctx);else {
      return ctx.pure(ctx);
    }
  }

  function _3(ctx) {
    var loop = ctx._loop;
    i = loop.value;
    return ctx.yldBH(i, _2);
  }
}

function a6() {
  var ctx = M.generator();
  return ctx.scopeBH(_1);

  function _1(ctx) {
    return ctx.yldBH(1, _2);
  }

  function _2(ctx) {
    return ctx.yldBH(2, _3);
  }

  function _3(ctx) {
    return ctx.yldBH(3, _4);
  }

  function _4(ctx, a) {
    if (a) return _5(ctx);else {
      return ctx._cb = _7, ctx._cb1 = _8, ctx.yldBH(4, _6);
    }
  }

  function _5(ctx) {
    return ctx._cb = _7, ctx._r = 10, ctx._cb1 = r_, _6(ctx);
  }

  function _6(ctx) {
    var cb = ctx._cb;
    return ctx._cb = undefined, ctx.yldBH('f1', cb);
  }

  function _7(ctx) {
    var cb = ctx._cb1;
    return ctx._cb1 = undefined, ctx.yldBH('f2', cb);
  }

  function _8(ctx) {
    return ctx.yldBH(5, _9);
  }

  function _9(ctx) {
    return ctx.pure(ctx);
  }

  function r_(ctx) {
    var r = ctx._r;
    return ctx.pure(ctx, r);
  }
}

function _a1() {
  var ctx = M.generator();
  return ctx.scopeBH(_1);

  function _1(ctx) {
    return ctx.yldBH(1, _2);
  }

  function _2(ctx) {
    return ctx.pure(ctx, 2);
  }
}

function _a2() {
  var i,
      ctx = M.generator();
  return ctx.scopeBH(_1);

  function _1(ctx) {
    var loop;
    loop = ctx.iterator(a4());
    return ctx._loop = loop, _2(ctx);
  }

  function _2(ctx) {
    var loop = ctx._loop,
        a,
        b;
    b = loop.incr();
    a = loop = b;
    if (!a.done) return ctx._loop = loop, _3(ctx);else {
      return ctx._loop = undefined, ctx.yldBH(10, _4);
    }
  }

  function _3(ctx) {
    var loop = ctx._loop;
    i = loop.value;
    return ctx.yldBH(i, _2);
  }

  function _4(ctx) {
    return ctx.pure(ctx);
  }
}

function _a3() {
  var i,
      ctx = M.generator();
  return ctx.scopeBH(_1);

  function _1(ctx) {
    var loop;
    loop = ctx.iterator(a4());
    return ctx._loop = loop, _2(ctx);
  }

  function _2(ctx) {
    var loop = ctx._loop,
        a,
        b;
    b = loop.incr();
    a = loop = b;
    if (!a.done) return ctx._loop = loop, _3(ctx);else {
      return ctx.pure(ctx);
    }
  }

  function _3(ctx) {
    var loop = ctx._loop;
    i = loop.value;
    return ctx.yldBH(i, _2);
  }
}

function _a6() {
  var ctx = M.generator();
  return ctx.scopeBH(_1);

  function _1(ctx) {
    var i;
    i = 0;
    return ctx._i = i, _2(ctx);
  }

  function _2(ctx) {
    var i = ctx._i,
        a;
    a = i++;
    return ctx._i = i, ctx.yldBH(a, _3);
  }

  function _3(ctx, a) {
    if (a === 'exit') return _4(ctx);else return _2(ctx);
  }

  function _4(ctx) {
    return ctx.pure(ctx, 100);
  }

  function _5(ctx) {
    return ctx.pure(ctx);
  }
}

function a7() {
  var ctx = M.generator();
  return ctx.scopeBH(_1);

  function _1(ctx) {
    return ctx.yldBH(1, _2);
  }

  function _2(ctx, a) {
    return a ? ctx.yldBH('A', _3) : ctx.yldBH('c', _4);
  }

  function _3(ctx, a) {
    return a ? ctx.yldBH('b', ctx.pure) : ctx.pure(ctx, a);
  }

  function _4(ctx, a) {
    return a ? ctx.pure(ctx, a) : ctx.yldBH('d', _5);
  }

  function _5(ctx, a) {
    return a ? ctx.yldBH('e', ctx.pure) : ctx.pure(ctx, a);
  }
}

function a7_1() {
  var ctx = M.generator();
  return ctx.scopeBH(_1);

  function _1(ctx) {
    return ctx.yldBH(1, _2);
  }

  function _2(ctx, a) {
    return a ? ctx.yldBH('A', _3) : ctx.yldBH('c', _4);
  }

  function _3(ctx, a) {
    return a ? ctx.yldBH('b', _6) : _6(ctx, a);
  }

  function _4(ctx, a) {
    return a ? _6(ctx, a) : ctx.yldBH('d', _5);
  }

  function _5(ctx, a) {
    return a ? ctx.yldBH('e', _6) : _6(ctx, a);
  }

  function _6(ctx, a) {
    return ctx._2 = a, ctx.yldBH(2, _7);
  }

  function _7(ctx, b) {
    var a = ctx._2;
    return ctx.yldBH(a + b, ctx.pure);
  }
}

function a7_2() {
  var ctx = M.generator();
  return ctx.scopeBH(_1);

  function _1(ctx) {
    return ctx.yldBH(1, _2);
  }

  function _2(ctx, a) {
    return a ? ctx.yldBH('A', _3) : ctx.yldBH('c', _4);
  }

  function _3(ctx, a) {
    return a ? ctx.yldBH('b', _6) : _6(ctx, a);
  }

  function _4(ctx, a) {
    return a ? _6(ctx, a) : ctx.yldBH('d', _5);
  }

  function _5(ctx, a) {
    return a ? ctx.yldBH('e', _6) : _6(ctx, a);
  }

  function _6(ctx, a) {
    return ctx._1 = a, ctx.yldBH(2, _7);
  }

  function _7(ctx, b) {
    var a = ctx._1;
    return ctx._1 = undefined, ctx.yldBH(a + b, _8);
  }

  function _8(ctx) {
    return ctx.yldBH('ex', _9);
  }

  function _9(ctx) {
    return ctx.pure(ctx);
  }
}

function a7_3() {
  var ctx = M.generator();
  return ctx.scopeBH(_1);

  function _1(ctx) {
    return ctx.yldBH(1, _2);
  }

  function _2(ctx, a) {
    return a % 2 ? ctx.yldBH('A', _3) : ctx.yldBH('c', _4);
  }

  function _3(ctx, a) {
    return a ? ctx.yldBH('b', _4) : _4(ctx, a);
  }

  function _4(ctx) {
    return ctx.yldBH(2, _5);
  }

  function _5(ctx) {
    return ctx.pure(ctx);
  }
}

function a7_4() {
  var ctx = M.generator();
  return ctx.scopeBH(_1);

  function _1(ctx) {
    return 1 ? ctx.yldBH(2, _3) : ctx.yldBH(3, _2);
  }

  function _2(ctx) {
    return ctx.yldBH(4, _3);
  }

  function _3(ctx, a) {
    return ctx.yldBH(a, _4);
  }

  function _4(ctx, a) {
    return ctx.yldBH(a, ctx.pure);
  }
}

function a7_5() {
  var ctx = M.generator();
  return ctx.scopeBH(_1);

  function _1(ctx) {
    return ctx.yldBH(1, _2);
  }

  function _2(ctx, a) {
    return a ? ctx.yldBH(2, _3) : ctx.yldBH(3, _3);
  }

  function _3(ctx, a) {
    return ctx.yldBH(a, ctx.pure);
  }
}

function a7_6() {
  var ctx = M.generator();
  return ctx.scopeBH(_1);

  function _1(ctx) {
    return ctx.yldBH(1, _2);
  }

  function _2(ctx, a) {
    return a ? ctx.yldBH('A', _3) : _4(ctx, 1);
  }

  function _3(ctx, a) {
    return a ? ctx.yldBH('b', _4) : _4(ctx, a);
  }

  function _4(ctx, a) {
    return ctx.yldBH(a, ctx.pure);
  }
}

function finallyBlock1() {
  var ctx = M.generator();
  return ctx.scopeBH(_1);

  function _1(ctx) {
    var i;
    i = 0;
    return ctx._i = i, _2(ctx);
  }

  function _2(ctx) {
    var i = ctx._i,
        a;
    a = i++;
    return ctx._i = i, ctx.yldBH(a === 3, _3);
  }

  function _3(ctx, a) {
    if (a) return _4(ctx);else return _2(ctx);
  }

  function _4(ctx) {
    return ctx._cb = _7, _5(ctx);
  }

  function _5(ctx) {
    return ctx.yldBH('exit', _6);
  }

  function _6(ctx) {
    var i = ctx._i,
        cb = ctx._cb;
    return ctx._i = undefined, ctx._cb = undefined, ctx.yldBH(i, cb);
  }

  function _7(ctx) {
    return ctx.pure(ctx);
  }
}

function ae() {
  var ctx = M.generator();
  return ctx.scopeBH(_1);

  function _1(ctx) {
    return ctx.yldBH(1, _2);
  }

  function _2(ctx) {
    return ctx.yldBH(2, _3);
  }

  function _3(ctx) {
    return ctx.yldBH(3, _4);
  }

  function _4(ctx, a) {
    if (a) return _5(ctx);else {
      return ctx.pure(ctx, 2);
    }
  }

  function _5(ctx) {
    return ctx.pure(ctx, 1);
  }

  function _6(ctx) {
    return ctx.yldBH(4, _7);
  }

  function _7(ctx) {
    return ctx.pure(ctx);
  }
}

function cfb() {
  var e,
      ctx = M.generator();
  return ctx.scopeBH(_1);

  function _1(ctx) {
    var i;
    i = 0;
    return ctx._i = i, _2(ctx);
  }

  function _2(ctx) {
    var i = ctx._i,
        a;

    try {
      a = i++;
      return ctx._i = i, ctx.yldBH(a === 3, _3, _4);
    } catch (ex) {
      return ctx._i = i, _4(ctx, ex);
    }
  }

  function _3(ctx, a) {
    var i = ctx._i,
        b;

    try {
      if (a) {
        throw new Error(`AAAAAAAAA${i++}`);
      }

      b = i++;
      return ctx._i = i, ctx._cb = _8, ctx.yldBH(`a${b}`, _7, _4);
    } catch (ex) {
      return ctx._i = i, _4(ctx, ex);
    }
  }

  function _4(ctx, ex) {
    var i = ctx._i,
        a;
    e = ex;
    a = i++;
    return ctx._i = i, ctx.yldBH(`e${a}`, _5);
  }

  function _5(ctx) {
    return ctx.yldBH(e, _6);
  }

  function _6(ctx) {
    var i = ctx._i,
        a;
    a = i++;
    return ctx._i = i, ctx._r = a, ctx._cb = r_, _7(ctx);
  }

  function _7(ctx) {
    var i = ctx._i,
        a,
        cb = ctx._cb;
    a = i++;
    return ctx._i = undefined, ctx._cb = undefined, ctx.yldBH(`f1${a}`, cb);
  }

  function _8(ctx) {
    return ctx.pure(ctx);
  }

  function r_(ctx) {
    var r = ctx._r;
    return ctx.pure(ctx, r);
  }
}

function cfb1() {
  var e,
      ctx = M.generator();
  return ctx.scopeBH(_1);

  function _1(ctx) {
    var i;
    i = 0;
    return ctx._i = i, _2(ctx);
  }

  function _2(ctx) {
    var i = ctx._i;

    try {
      return ctx.yldBH(i, _3, _4);
    } catch (ex) {
      return _4(ctx, ex);
    }
  }

  function _3(ctx) {
    var i = ctx._i;

    try {
      throw new Error(`AAAAAAAAA${i++}`);
      return ctx._i = i, ctx._cb = _6, _5(ctx);
    } catch (ex) {
      return ctx._i = i, _4(ctx, ex);
    }
  }

  function _4(ctx, ex) {
    var i = ctx._i,
        a;
    e = ex;
    a = i++;
    return ctx._i = i, ctx._r = a, ctx._cb = r_, _5(ctx);
  }

  function _5(ctx) {
    var i = ctx._i,
        cb = ctx._cb;
    console.log(`f${i}`);
    return ctx._i = undefined, ctx._cb = undefined, cb(ctx);
  }

  function _6(ctx) {
    return ctx.pure(ctx);
  }

  function r_(ctx) {
    var r = ctx._r;
    return ctx.pure(ctx, r);
  }
}

function _cfb1() {
  var e,
      ctx = M.generator();
  return ctx.scopeBH(_1);

  function _1(ctx) {
    var i;
    i = 0;
    return ctx._i = i, _2(ctx);
  }

  function _2(ctx) {
    var i = ctx._i;

    try {
      return ctx.yldBH(i, _3, _4);
    } catch (ex) {
      return _4(ctx, ex);
    }
  }

  function _3(ctx) {
    try {
      return ctx.yldBH(5, _5, _4);
    } catch (ex) {
      return _4(ctx, ex);
    }
  }

  function _4(ctx, ex) {
    var i = ctx._i,
        a;
    e = ex;
    a = i++;
    return ctx.pure(ctx, a);
  }

  function _5(ctx) {
    return ctx.pure(ctx);
  }
}

function cfb2() {
  var e,
      ctx = M.generator();
  return ctx.scopeBH(_1);

  function _1(ctx) {
    var i;
    i = 0;
    return ctx._i = i, _2(ctx);
  }

  function _c(ctx, ex) {
    return ctx._ex = ex, ctx._cb = _6, _5(ctx);
  }

  function _2(ctx) {
    var i = ctx._i,
        a;

    try {
      a = i++;
      return ctx._i = i, ctx.yldBH(`a:${a}`, _3, _c);
    } catch (ex) {
      return ctx._i = i, _c(ctx, ex);
    }
  }

  function _3(ctx) {
    var i = ctx._i,
        a;

    try {
      a = i++;
      return ctx._i = i, ctx.yldBH(`b:${a}`, _4, _c);
    } catch (ex) {
      return ctx._i = i, _c(ctx, ex);
    }
  }

  function _4(ctx) {
    var i = ctx._i,
        a;

    try {
      a = i++;
      return ctx._i = i, ctx._cb = _8, ctx.yldBH(`c:${a}`, _5, _c);
    } catch (ex) {
      return ctx._i = i, _c(ctx, ex);
    }
  }

  function __c(ctx, ex) {
    return ctx._ex = ex, _6(ctx);
  }

  function _5(ctx) {
    var i = ctx._i,
        a,
        cb = ctx._cb;

    try {
      a = i++;
      return ctx._cb = undefined, ctx._i = i, ctx.yldBH(`f:${a}`, cb, __c);
    } catch (ex) {
      return ctx._cb = undefined, ctx._i = i, __c(ctx, ex);
    }
  }

  function _6(ctx) {
    var ex = ctx._ex;
    e = ex;
    return ctx._ex = undefined, ctx.yldBH(e, _7);
  }

  function _7(ctx) {
    var i = ctx._i,
        a;
    a = i++;
    return ctx._i = i, ctx.yldBH(`e:${a}`, _8);
  }

  function _8(ctx) {
    return ctx.pure(ctx);
  }
}

function cfb3() {
  var e,
      ctx = M.generator();
  return ctx.scopeBH(_1);

  function _1(ctx) {
    var i;
    i = 0;
    return ctx._i = i, _2(ctx);
  }

  function _c(ctx, ex) {
    return ctx._ex = ex, ctx._cb = _6, _4(ctx);
  }

  function _2(ctx) {
    var i = ctx._i;

    try {
      return ctx.yldBH(i === 3, _3, _c);
    } catch (ex) {
      return _c(ctx, ex);
    }
  }

  function _3(ctx, a) {
    var i = ctx._i;

    try {
      if (a) {
        throw new Error(`AAAAAAAAA${i++}`);
      }

      return ctx._i = i, ctx._cb = _5, ctx.yldBH(`a${i}`, _4, _c);
    } catch (ex) {
      return ctx._i = i, _c(ctx, ex);
    }
  }

  function __c(ctx, ex) {
    return ctx._ex = ex, _6(ctx);
  }

  function _4(ctx) {
    var i = ctx._i,
        a,
        cb = ctx._cb;

    try {
      a = i++;
      return ctx._cb = undefined, ctx._i = i, ctx.yldBH(`f1${a}`, cb, __c);
    } catch (ex) {
      return ctx._cb = undefined, ctx._i = i, __c(ctx, ex);
    }
  }

  function _5(ctx) {
    var i = ctx._i,
        a;

    try {
      a = i++;
      return ctx._i = i, ctx.yldBH(`b${a}`, _9, __c);
    } catch (ex) {
      return ctx._i = i, __c(ctx, ex);
    }
  }

  function _6(ctx) {
    var i = ctx._i,
        ex = ctx._ex;
    e = ex;
    return ctx._ex = undefined, ctx.yldBH(`e${i}`, _7);
  }

  function _7(ctx) {
    return ctx.yldBH(e, _8);
  }

  function _8(ctx) {
    var i = ctx._i;
    return ctx.pure(ctx, i);
  }

  function _9(ctx) {
    var i = ctx._i;
    i++;
    return ctx._i = i, _2(ctx);
  }

  function _10(ctx) {
    return ctx.pure(ctx);
  }
}

function cfb4() {
  var e,
      ctx = M.generator();
  return ctx.scopeBH(_1);

  function _1(ctx) {
    try {
      return ctx.yldBH(5, _3, _2);
    } catch (ex) {
      return _2(ctx, ex);
    }
  }

  function _2(ctx, ex) {
    e = ex;
    return ctx.pure(ctx, 10);
  }

  function _3(ctx) {
    return ctx.pure(ctx);
  }
}

function _cfb2() {
  var e,
      ctx = M.generator();
  return ctx.scopeBH(_1);

  function _1(ctx) {
    var i;
    i = 0;
    return ctx._i = i, _2(ctx);
  }

  function _c(ctx, ex) {
    return ctx._ex = ex, ctx._cb = _4, _3(ctx);
  }

  function _2(ctx) {
    var i = ctx._i,
        a;

    try {
      a = i++;
      return ctx._i = i, ctx._cb = _6, ctx.yldBH(`c:${a}`, _3, _c);
    } catch (ex) {
      return ctx._i = i, _c(ctx, ex);
    }
  }

  function __c(ctx, ex) {
    return ctx._ex = ex, _4(ctx);
  }

  function _3(ctx) {
    var i = ctx._i,
        a,
        cb = ctx._cb;

    try {
      a = i++;
      return ctx._cb = undefined, ctx._i = i, ctx.yldBH(`f:${a}`, cb, __c);
    } catch (ex) {
      return ctx._cb = undefined, ctx._i = i, __c(ctx, ex);
    }
  }

  function _4(ctx) {
    var ex = ctx._ex;
    e = ex;
    return ctx._ex = undefined, ctx.yldBH(e, _5);
  }

  function _5(ctx) {
    var i = ctx._i,
        a;
    a = i++;
    return ctx._i = i, ctx.yldBH(`e:${a}`, _6);
  }

  function _6(ctx) {
    return ctx.pure(ctx);
  }
}

function cfb6() {
  var e,
      ctx = M.generator();
  return ctx.scopeBH(_1);

  function _1(ctx) {
    try {
      return ctx._cb = _5, ctx.yldBH(1, _4, _2);
    } catch (ex) {
      return _2(ctx, ex);
    }
  }

  function _2(ctx, ex) {
    e = ex;
    return ctx.yldBH(2, _3);
  }

  function _3(ctx) {
    return ctx._r = 3, ctx._cb = r_, _4(ctx);
  }

  function _4(ctx) {
    var cb = ctx._cb;
    return ctx._cb = undefined, ctx.yldBH(4, cb);
  }

  function _5(ctx) {
    return ctx.pure(ctx);
  }

  function r_(ctx) {
    var r = ctx._r;
    return ctx.pure(ctx, r);
  }
}

function fb4() {
  var ctx = M.generator();
  return ctx.scopeBH(_1);

  function _1(ctx) {
    var i;
    i = 0;
    return ctx._i = i, _2(ctx);
  }

  function _2(ctx) {
    var i = ctx._i,
        a;
    a = i++;
    return ctx._i = i, ctx.yldBH(a, _3);
  }

  function _3(ctx, a) {
    if (a === 3) return _4(ctx);else return _2(ctx);
  }

  function _4(ctx) {
    var i = ctx._i;
    return ctx._r = i, ctx._cb = r_, _5(ctx);
  }

  function _5(ctx) {
    return ctx.yldBH('exit', _6);
  }

  function _6(ctx) {
    var i = ctx._i,
        cb = ctx._cb;
    return ctx._i = undefined, ctx._cb = undefined, ctx.yldBH(i, cb);
  }

  function _7(ctx) {
    return ctx.pure(ctx);
  }

  function r_(ctx) {
    var r = ctx._r;
    return ctx.pure(ctx, r);
  }
}

function while2() {
  var ctx = M.generator();
  return ctx.scopeBH(_1);

  function _1(ctx) {
    var i;
    i = 0;
    return ctx._i = i, _2(ctx);
  }

  function _2(ctx) {
    var i = ctx._i,
        a;
    a = i++;
    return ctx._i = i, ctx.yldBH(a, _3);
  }

  function _3(ctx, a) {
    if (a < 3) return _4(ctx);else {
      return ctx.pure(ctx);
    }
  }

  function _4(ctx) {
    var i = ctx._i,
        a;
    a = i++;
    return ctx._i = i, ctx.yldBH(a, _2);
  }
}

function for2() {
  var ctx = M.generator();
  return ctx.scopeBH(_1);

  function _1(ctx) {
    return ctx.yldBH(undefined, _2);
  }

  function _2(ctx, i) {
    return ctx._i = i, _3(ctx);
  }

  function _3(ctx) {
    var i = ctx._i;
    return ctx.yldBH(i, _4);
  }

  function _4(ctx, a) {
    if (a < 10) return _5(ctx);else {
      return ctx.pure(ctx);
    }
  }

  function _5(ctx) {
    var i = ctx._i;
    return ctx.yldBH(i, _6);
  }

  function _6(ctx) {
    var i = ctx._i;
    i++;
    return ctx._i = i, _3(ctx);
  }
}

function c1() {
  let i = 0;

  function a() {
    var b = function b() {
      var c = function c() {
        var ctx = M.generator();
        return ctx.scopeBH(_1);

        function _1(ctx) {
          i++;
          return ctx.pure(ctx);
        }
      },
          ctx = M.generator();

      return ctx.scopeBH(_1);

      function _1(ctx) {
        return ctx.pure(ctx, c);
      }

      function _2(ctx) {
        return ctx.yldBH(i, _3);
      }

      function _3(ctx) {
        return ctx.jBH(_c1(), _4);
      }

      function _4(ctx, a) {
        return ctx.yldBH(a, _5);
      }

      function _5(ctx) {
        return ctx.pure(ctx);
      }
    },
        ctx = M.generator();

    return ctx.scopeBH(_1);

    function _1(ctx) {
      return ctx.pure(ctx);
    }
  }
}

function c2() {
  let i = 0;

  function inner() {
    var a = function a() {
      var ctx = M.generator();
      return ctx.scopeBH(_1);

      function _1(ctx) {
        return ctx.yldBH(`a:${i}`, _2);
      }

      function _2(ctx, a) {
        return ctx.pure(ctx, i += a);
      }
    },
        b,
        f,
        j,
        c = () => {
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
        return function z() {
          var d,
              c = function c() {
            return i += this.something;
          },
              _z = function z(j) {
            return i += j;
          },
              z1 = function z(j) {
            var ctx = M.generator();
            return ctx.scopeBH(_1);

            function _1(ctx) {
              return ctx.jBH(a(), _2);
            }

            function _2(ctx, a) {
              return ctx._2 = a, ctx.jBH(b(), _3);
            }

            function _3(ctx, b) {
              var a = ctx._2;
              return ctx.pure(ctx, i += j + a + b);
            }
          },
              ctx = M.generator();

          return ctx.scopeBH(_1);

          function _1(ctx) {
            d = _z;
            return ctx.jBH(c(), _2);
          }

          function _2(ctx, a) {
            return ctx.jBH(d(a), _3);
          }

          function _3(ctx, a) {
            return ctx.yldStarBH(a, _4);
          }

          function _4(ctx, a) {
            return ctx.yldBH(`b:${a}`, _5);
          }

          function _5(ctx) {
            return ctx.pure(ctx, z1);
          }
        };
      }
    },
        ctx = M.generator();

    return ctx._ = c, ctx.scopeBH(_1);

    function _1(ctx) {
      var k,
          c = ctx._;
      b = c;
      k = 1;
      return ctx._ = undefined, ctx._k = k, ctx.jBH(b(), _2);
    }

    function _2(ctx, b) {
      var loop;
      f = [a, b];
      loop = ctx.iterator(f);
      return ctx._loop = loop, _3(ctx);
    }

    function _3(ctx) {
      var k = ctx._k,
          loop = ctx._loop,
          a,
          b;
      b = loop.incr();
      a = loop = b;
      if (!a.done) return ctx._loop = loop, _4(ctx);else {
        return ctx.pure(ctx, k);
      }
    }

    function _4(ctx) {
      var loop = ctx._loop;
      j = loop.value;
      return ctx.jBH(j(), _5);
    }

    function _5(ctx, a) {
      return ctx.yldStarBH(a, _6);
    }

    function _6(ctx, a) {
      var k = ctx._k;
      k += a;
      return ctx._k = k, _3(ctx);
    }
  }

  return inner;
}

function _c1() {
  var i,
      ctx = M.generator();
  return ctx.scopeBH(_1);

  function _1(ctx) {
    i = 0;
    return ctx.yldBH(`a:${i}`, ctx.pure);
  }
}

function _c2() {
  var ctx = M.generator();
  return ctx.scopeBH(_1);

  function _1(ctx) {
    var i;
    i = 0;
    return ctx._i = i, ctx.yldBH(`a:${i}`, _2);
  }

  function _2(ctx, a) {
    var i = ctx._i;
    return ctx.pure(ctx, i += a);
  }
}

function forOf() {
  var i,
      ctx = M.generator();
  return ctx.scopeBH(_1);

  function _1(ctx) {
    var loop;
    loop = ctx.iterator([1, 2, 3]);
    return ctx._loop = loop, _2(ctx);
  }

  function _2(ctx) {
    var loop = ctx._loop,
        a,
        b;
    b = loop.incr();
    a = loop = b;
    if (!a.done) return ctx._loop = loop, _3(ctx);else {
      return ctx.pure(ctx);
    }
  }

  function _3(ctx) {
    var loop = ctx._loop;
    i = loop.value;
    return ctx.yldBH(i, _2);
  }
}

const objMethods = {
  a() {
    var ctx = M.generator();
    return ctx.scopeBH(_1);

    function _1(ctx) {
      return ctx.yldBH(10, _2);
    }

    function _2(ctx) {
      return ctx.pure(ctx);
    }
  },

  b() {
    var _this = this,
        _args = arguments,
        ctx = M.generator();

    return ctx.__this = _this, ctx.__args = _args, ctx.scopeBH(_1);

    function _1(ctx) {
      return ctx.yldBH(1, _2);
    }

    function _2(ctx) {
      var _this = ctx.__this;
      return ctx.__this = undefined, ctx.yldBH(_this, _3);
    }

    function _3(ctx) {
      var _args = ctx.__args;
      return ctx.__args = undefined, ctx.yldBH(_args, _4);
    }

    function _4(ctx) {
      return ctx.pure(ctx);
    }
  }

};
const objM = {
  objMethod() {
    var ctx = M.generator();
    return ctx.scopeBH(_1);

    function _1(ctx) {
      return ctx.yldBH(1, _2);
    }

    function _2(ctx) {
      return ctx.pure(ctx);
    }
  }

};

function objMethodsClosure() {
  var i,
      k,
      m,
      a = function objMethod1(k) {
    var j,
        a = function objMethod2(m) {
      var ctx = M.generator();
      return ctx._m = m, ctx.scopeBH(_1);

      function _1(ctx) {
        var a;
        a = j++;
        return ctx.yldBH(a, _2);
      }

      function _2(ctx) {
        var a;
        a = k++;
        return ctx.yldBH(a, _3);
      }

      function _3(ctx) {
        var m = ctx._m,
            a;
        a = m++;
        return ctx._m = undefined, ctx.yldBH(a, _4);
      }

      function _4(ctx) {
        return ctx.pure(ctx);
      }
    },
        ctx = M.generator();

    return ctx._ = a, ctx.scopeBH(_1);

    function _1(ctx) {
      var a;
      j = 0;
      a = i++;
      return ctx.yldBH(a, _2);
    }

    function _2(ctx) {
      var a;
      a = k++;
      return ctx.yldBH(a, _3);
    }

    function _3(ctx) {
      var a;
      a = m++;
      return ctx.yldBH(a, _4);
    }

    function _4(ctx) {
      var a = ctx._;
      return ctx.pure(ctx, {
        objMethod2: a
      });
    }
  },
      ctx = M.generator();

  return ctx._ = a, ctx.scopeBH(_1);

  function _1(ctx) {
    var a = ctx._;
    i = 0;
    k = 0;
    m = 0;
    return ctx.pure(ctx, {
      objMethod1: a
    });
  }
}

const objMThis = {
  [objMethod(_a)]() {
    var _this = this,
        _args = arguments,
        ctx = M.generator();

    return ctx.__this = _this, ctx.__args = _args, ctx.scopeBH(_1);

    function _1(ctx) {
      var _this = ctx.__this;
      return ctx.yldBH(_this, _2);
    }

    function _2(ctx) {
      var _this = ctx.__this;
      return ctx.__this = undefined, ctx.yldBH(_this, _3);
    }

    function _3(ctx) {
      var _args = ctx.__args;
      return ctx.__args = undefined, ctx.yldBH(_args[0], _4);
    }

    function _4(ctx) {
      return ctx.pure(ctx);
    }
  }

};

class SomeClass {
  f(i) {
    var _this = this,
        _args = arguments,
        ctx = M.generator();

    return ctx.__this = _this, ctx.__args = _args, ctx.scopeBH(_1);

    function _1(ctx) {
      return ctx.yldBH(i, _2);
    }

    function _2(ctx) {
      var _args = ctx.__args;
      return ctx.__args = undefined, ctx.yldBH(_args, _3);
    }

    function _3(ctx) {
      var _this = ctx.__this;
      return ctx.__this = undefined, ctx.yldBH(_this, _4);
    }

    function _4(ctx) {
      return ctx.pure(ctx);
    }
  }

}

class SomeChild extends SomeClass {
  f(i) {
    var _this = this,
        _args = arguments,
        ctx = M.generator();

    return ctx.__this = _this, ctx.__args = _args, ctx.scopeBH(_1);

    function _1(ctx) {
      return ctx.yldBH(i, _2);
    }

    function _2(ctx) {
      var _args = ctx.__args;
      return ctx.__args = undefined, ctx.yldBH(_args, _3);
    }

    function _3(ctx) {
      var _this = ctx.__this,
          a,
          b;
      b = Object.getPrototypeOf(_this);
      a = b[i].call(_this, i);
      return ctx.__this = undefined, ctx.yldStarBH(a, _4);
    }

    function _4(ctx) {
      return ctx.pure(ctx);
    }
  }

  static f(i) {
    var _this = this,
        ctx = M.generator();

    return ctx.__this = _this, ctx.scopeBH(_1);

    function _1(ctx) {
      var _this = ctx.__this,
          a,
          b;
      b = Object.getPrototypeOf(_this);
      a = b[i].call(_this, i);
      return ctx.__this = undefined, ctx.yldStarBH(a, _2);
    }

    function _2(ctx) {
      return ctx.pure(ctx);
    }
  }

}

function clasClosure(A) {
  var cnt,
      B = class B extends A {
    constructor() {
      var ctx = M.generator();
      return ctx.scopeBH(_1);

      function _1(ctx) {
        cnt++;
        return ctx.pure(ctx);
      }
    }

    static f() {
      var ctx = M.generator();
      return ctx.scopeBH(_1);

      function _1(ctx) {
        return ctx.yldBH(1, _2);
      }

      function _2(ctx) {
        return ctx.pure(ctx);
      }
    }

  },
      _B = class _B extends A {
    constructor() {
      var ctx = M.generator();
      return ctx.scopeBH(_1);

      function _1(ctx) {
        cnt += 2;
        return ctx.pure(ctx);
      }
    }

    static f() {
      var ctx = M.generator();
      return ctx.scopeBH(_1);

      function _1(ctx) {
        var a;
        a = cnt += 2;
        return ctx.yldBH(a, _2);
      }

      function _2(ctx) {
        return ctx.pure(ctx);
      }
    }

  },
      C,
      a = class extends A {
    static f() {
      var ctx = M.generator();
      return ctx.scopeBH(_1);

      function _1(ctx) {
        var a;
        a = cnt += 3;
        return ctx.yldBH(a, _2);
      }

      function _2(ctx) {
        var a;
        a = _B.f();
        return ctx.yldStarBH(a, _3);
      }

      function _3(ctx) {
        return ctx.pure(ctx);
      }
    }

  },
      ctx = M.generator();

  return ctx._ = a, ctx.scopeBH(_1);

  function _1(ctx) {
    var a;
    cnt = 0;
    a = cnt++;
    return ctx.yldBH(a, _2);
  }

  function _2(ctx) {
    var a;
    a = B.f();
    return ctx.yldStarBH(a, _3);
  }

  function _3(ctx) {
    var a = ctx._,
        b;
    C = a;
    b = cnt += 3;
    return ctx._ = undefined, ctx.yldBH(b, _4);
  }

  function _4(ctx) {
    var a;
    a = C.f();
    return ctx.yldStarBH(a, _5);
  }

  function _5(ctx) {
    var a;
    a = B.f();
    return ctx.yldStarBH(a, _6);
  }

  function _6(ctx) {
    return ctx.pure(ctx);
  }
}

function c21() {
  var i,
      closure1_a = function closure1_a() {
    var ctx = M.generator();
    return ctx.scopeBH(_1);

    function _1(ctx) {
      return ctx.yldBH(`a`, _2);
    }

    function _2(ctx, a) {
      return ctx.pure(ctx, i += a);
    }
  },
      closure1_b = function closure1_b() {
    i++;

    function closure1_c() {
      i += 2;
      return i;
    }

    function closure1_d() {
      return closure1_c();
    }

    return closure1_c;
  },
      ctx = M.generator();

  return ctx.scopeBH(_1);

  function _1(ctx) {
    i = 0;
    return ctx.pure(ctx, closure1_b()());
  }
}

function loopCapt1() {
  var a = i => {
    let j = 0;
    funs(function iter() {
      var ctx = M.generator();
      return ctx.scopeBH(_1);

      function _1(ctx) {
        var a;
        a = j++;
        return ctx.yldBH(`${i} ${a}`, _2);
      }

      function _2(ctx) {
        return ctx.pure(ctx);
      }
    });
    return;
  },
      ctx = M.generator();

  return ctx._ = a, ctx.scopeBH(_1);

  function _1(ctx) {
    var i,
        a = ctx._;

    for (i = 0; i < 3; i++) {
      a(i);
    }

    return ctx.pure(ctx);
  }
}

function loopCapt2() {
  var a = i => {
    var j,
        iter = function iter() {
      var ctx = M.generator();
      return ctx.scopeBH(_1);

      function _1(ctx) {
        return ctx.yldBH(j + i, _2);
      }

      function _2(ctx) {
        return ctx.pure(ctx);
      }
    },
        ctx = M.generator();

    return ctx.scopeBH(_1);

    function _1(ctx) {
      return ctx.yldBH(i, _2);
    }

    function _2(ctx) {
      j = i + 1;
      funs(iter);
      return ctx.pure(ctx);
    }
  },
      ctx = M.generator();

  return ctx._ = a, ctx.scopeBH(_1);

  function _1(ctx) {
    var i;
    i = 0;
    return ctx._i = i, _2(ctx);
  }

  function _2(ctx) {
    var i = ctx._i;
    if (i < 3) return _3(ctx);else {
      return ctx._i = undefined, ctx.yldBH('f', _5);
    }
  }

  function _3(ctx) {
    var i = ctx._i,
        a = ctx._;
    return ctx.jBH(a(i), _4);
  }

  function _4(ctx) {
    var i = ctx._i;
    i++;
    return ctx._i = i, _2(ctx);
  }

  function _5(ctx) {
    return ctx.pure(ctx);
  }
}

function loopCapt3() {
  var a = i => {
    var a = j => {
      var iter = function iter() {
        var ctx = M.generator();
        return ctx.scopeBH(_1);

        function _1(ctx) {
          var a;
          a = j++;
          return ctx.yldBH(`${i} ${a}`, _2);
        }

        function _2(ctx) {
          return ctx.pure(ctx);
        }
      },
          ctx = M.generator();

      return ctx.scopeBH(_1);

      function _1(ctx) {
        return ctx.yldBH(j, _2);
      }

      function _2(ctx) {
        funs(iter);
        return ctx.pure(ctx);
      }
    },
        ctx = M.generator();

    return ctx._ = a, ctx.scopeBH(_1);

    function _1(ctx) {
      return ctx.yldBH(i, _2);
    }

    function _2(ctx) {
      var j;
      j = 0;
      return ctx._j = j, _3(ctx);
    }

    function _3(ctx) {
      var j = ctx._j;
      if (j < 3) return _4(ctx);else {
        return ctx.pure(ctx);
      }
    }

    function _4(ctx) {
      var j = ctx._j,
          a = ctx._;
      return ctx.jBH(a(j), _5);
    }

    function _5(ctx) {
      var j = ctx._j;
      j++;
      return ctx._j = j, _3(ctx);
    }
  },
      ctx = M.generator();

  return ctx._ = a, ctx.scopeBH(_1);

  function _1(ctx) {
    var i;
    i = 0;
    return ctx._i = i, _2(ctx);
  }

  function _2(ctx) {
    var i = ctx._i;
    if (i < 3) return _3(ctx);else {
      return ctx.pure(ctx);
    }
  }

  function _3(ctx) {
    var i = ctx._i,
        a = ctx._;
    return ctx.jBH(a(i), _4);
  }

  function _4(ctx) {
    var i = ctx._i;
    i++;
    return ctx._i = i, _2(ctx);
  }
}

function loopCapt4() {
  var a = i => {
    for (let j = 0; j < 3; j++) {
      (j => {
        funs(function iter() {
          var ctx = M.generator();
          return ctx.scopeBH(_1);

          function _1(ctx) {
            var a;
            a = j++;
            return ctx.yldBH(`${i} ${a}`, _2);
          }

          function _2(ctx) {
            return ctx.pure(ctx);
          }
        });
        return;
      })(j);
    }

    return;
  },
      ctx = M.generator();

  return ctx._ = a, ctx.scopeBH(_1);

  function _1(ctx) {
    var i,
        a = ctx._;

    for (i = 0; i < 3; i++) {
      a(i);
    }

    return ctx.pure(ctx);
  }
}

function forOfCapt1() {
  var i,
      b = i => {
    let j = 0;
    funs(function iter() {
      var ctx = M.generator();
      return ctx.scopeBH(_1);

      function _1(ctx) {
        var a;
        a = j++;
        return ctx.yldBH(`${i} ${a}`, _2);
      }

      function _2(ctx) {
        return ctx.pure(ctx);
      }
    });
    return;
  },
      ctx = M.generator();

  return ctx._ = b, ctx.scopeBH(_1);

  function _1(ctx) {
    var loop;
    loop = ctx.iterator(_a);
    return ctx._loop = loop, _2(ctx);
  }

  function _2(ctx) {
    var loop = ctx._loop,
        a,
        b;
    b = loop.incr();
    a = loop = b;
    if (!a.done) return ctx._loop = loop, _3(ctx);else {
      return ctx.pure(ctx);
    }
  }

  function _3(ctx) {
    var loop = ctx._loop,
        b = ctx._;
    i = loop.value;
    b(i);
    return _2(ctx);
  }
}

function forOfCapt2() {
  var i,
      b = i => {
    var j,
        iter = function iter() {
      var ctx = M.generator();
      return ctx.scopeBH(_1);

      function _1(ctx) {
        var a;
        a = j++;
        return ctx.yldBH(`${i} ${a}`, _2);
      }

      function _2(ctx) {
        return ctx.pure(ctx);
      }
    },
        ctx = M.generator();

    return ctx.scopeBH(_1);

    function _1(ctx) {
      j = 0;
      return ctx.yldBH(i, _2);
    }

    function _2(ctx) {
      funs(iter);
      return ctx.pure(ctx);
    }
  },
      ctx = M.generator();

  return ctx._ = b, ctx.scopeBH(_1);

  function _1(ctx) {
    var loop;
    loop = ctx.iterator(_a);
    return ctx._loop = loop, _2(ctx);
  }

  function _2(ctx) {
    var loop = ctx._loop,
        a,
        b;
    b = loop.incr();
    a = loop = b;
    if (!a.done) return ctx._loop = loop, _3(ctx);else {
      return ctx.pure(ctx);
    }
  }

  function _3(ctx) {
    var loop = ctx._loop,
        b = ctx._;
    i = loop.value;
    return ctx.jBH(b(i), _2);
  }
}

function forOfCapt3() {
  var i,
      c = i => {
    var a = j => {
      funs(function iter() {
        var ctx = M.generator();
        return ctx.scopeBH(_1);

        function _1(ctx) {
          var a;
          a = j++;
          return ctx.yldBH(`${i} ${a}`, _2);
        }

        function _2(ctx) {
          return ctx.pure(ctx);
        }
      });
      return;
    },
        ctx = M.generator();

    return ctx._ = a, ctx.scopeBH(_1);

    function _1(ctx) {
      var loop;
      loop = ctx.iterator(b);
      return ctx._loop = loop, _2(ctx);
    }

    function _2(ctx) {
      var loop = ctx._loop,
          a,
          b;
      b = loop.incr();
      a = loop = b;
      if (!a.done) return ctx._loop = loop, _3(ctx);else {
        return ctx.pure(ctx);
      }
    }

    function _3(ctx) {
      var j,
          loop = ctx._loop,
          a = ctx._;
      j = loop.value;
      a(j);
      return _2(ctx);
    }
  },
      ctx = M.generator();

  return ctx._ = c, ctx.scopeBH(_1);

  function _1(ctx) {
    var loop;
    loop = ctx.iterator(_a);
    return ctx._loop = loop, _2(ctx);
  }

  function _2(ctx) {
    var loop = ctx._loop,
        a,
        b;
    b = loop.incr();
    a = loop = b;
    if (!a.done) return ctx._loop = loop, _3(ctx);else {
      return ctx.pure(ctx);
    }
  }

  function _3(ctx) {
    var loop = ctx._loop,
        c = ctx._;
    i = loop.value;
    return ctx.jBH(c(i), _2);
  }
}

function forOfCapt4() {
  var i,
      c = i => {
    var a = j => {
      var iter = function iter() {
        var ctx = M.generator();
        return ctx.scopeBH(_1);

        function _1(ctx) {
          var a;
          a = j++;
          return ctx.yldBH(`${i} ${a}`, _2);
        }

        function _2(ctx) {
          return ctx.pure(ctx);
        }
      },
          ctx = M.generator();

      return ctx.scopeBH(_1);

      function _1(ctx) {
        return ctx.yldBH(j, _2);
      }

      function _2(ctx) {
        funs(iter);
        return ctx.pure(ctx);
      }
    },
        ctx = M.generator();

    return ctx._ = a, ctx.scopeBH(_1);

    function _1(ctx) {
      var loop;
      loop = ctx.iterator(b);
      return ctx._loop = loop, _2(ctx);
    }

    function _2(ctx) {
      var loop = ctx._loop,
          a,
          b;
      b = loop.incr();
      a = loop = b;
      if (!a.done) return ctx._loop = loop, _3(ctx);else {
        return ctx.pure(ctx);
      }
    }

    function _3(ctx) {
      var j,
          loop = ctx._loop,
          a = ctx._;
      j = loop.value;
      return ctx.jBH(a(j), _2);
    }
  },
      ctx = M.generator();

  return ctx._ = c, ctx.scopeBH(_1);

  function _1(ctx) {
    var loop;
    loop = ctx.iterator(_a);
    return ctx._loop = loop, _2(ctx);
  }

  function _2(ctx) {
    var loop = ctx._loop,
        a,
        b;
    b = loop.incr();
    a = loop = b;
    if (!a.done) return ctx._loop = loop, _3(ctx);else {
      return ctx.pure(ctx);
    }
  }

  function _3(ctx) {
    var loop = ctx._loop,
        c = ctx._;
    i = loop.value;
    return ctx.jBH(c(i), _2);
  }
}

function forOfCapt5() {
  var i,
      c = i => {
    var a = j => {
      funs(function iter() {
        var ctx = M.generator();
        return ctx.scopeBH(_1);

        function _1(ctx) {
          var a;
          a = j++;
          return ctx.yldBH(`${i} ${a}`, _2);
        }

        function _2(ctx) {
          return ctx.pure(ctx);
        }
      });
      return;
    },
        ctx = M.generator();

    return ctx._ = a, ctx.scopeBH(_1);

    function _1(ctx) {
      return ctx.yldBH(i, _2);
    }

    function _2(ctx) {
      var loop;
      loop = ctx.iterator(b);
      return ctx._loop = loop, _3(ctx);
    }

    function _3(ctx) {
      var loop = ctx._loop,
          a,
          b;
      b = loop.incr();
      a = loop = b;
      if (!a.done) return ctx._loop = loop, _4(ctx);else {
        return ctx.pure(ctx);
      }
    }

    function _4(ctx) {
      var j,
          loop = ctx._loop,
          a = ctx._;
      j = loop.value;
      a(j);
      return _3(ctx);
    }
  },
      ctx = M.generator();

  return ctx._ = c, ctx.scopeBH(_1);

  function _1(ctx) {
    var loop;
    loop = ctx.iterator(_a);
    return ctx._loop = loop, _2(ctx);
  }

  function _2(ctx) {
    var loop = ctx._loop,
        a,
        b;
    b = loop.incr();
    a = loop = b;
    if (!a.done) return ctx._loop = loop, _3(ctx);else {
      return ctx.pure(ctx);
    }
  }

  function _3(ctx) {
    var loop = ctx._loop,
        c = ctx._;
    i = loop.value;
    return ctx.jBH(c(i), _2);
  }
}

function forOfCapt6() {
  var i,
      c = i => {
    var a = j => {
      var iter = function iter() {
        var ctx = M.generator();
        return ctx.scopeBH(_1);

        function _1(ctx) {
          var a;
          a = j++;
          return ctx.yldBH(`${i} ${a}`, _2);
        }

        function _2(ctx) {
          return ctx.pure(ctx);
        }
      },
          ctx = M.generator();

      return ctx.scopeBH(_1);

      function _1(ctx) {
        return ctx.yldBH(i, _2);
      }

      function _2(ctx) {
        funs(iter);
        return ctx.pure(ctx);
      }
    },
        ctx = M.generator();

    return ctx._ = a, ctx.scopeBH(_1);

    function _1(ctx) {
      return ctx.yldBH(i, _2);
    }

    function _2(ctx) {
      var loop;
      loop = ctx.iterator(b);
      return ctx._loop = loop, _3(ctx);
    }

    function _3(ctx) {
      var loop = ctx._loop,
          a,
          b;
      b = loop.incr();
      a = loop = b;
      if (!a.done) return ctx._loop = loop, _4(ctx);else {
        return ctx.pure(ctx);
      }
    }

    function _4(ctx) {
      var j,
          loop = ctx._loop,
          a = ctx._;
      j = loop.value;
      return ctx.jBH(a(j), _3);
    }
  },
      ctx = M.generator();

  return ctx._ = c, ctx.scopeBH(_1);

  function _1(ctx) {
    var loop;
    loop = ctx.iterator(_a);
    return ctx._loop = loop, _2(ctx);
  }

  function _2(ctx) {
    var loop = ctx._loop,
        a,
        b;
    b = loop.incr();
    a = loop = b;
    if (!a.done) return ctx._loop = loop, _3(ctx);else {
      return ctx.pure(ctx);
    }
  }

  function _3(ctx) {
    var loop = ctx._loop,
        c = ctx._;
    i = loop.value;
    return ctx.jBH(c(i), _2);
  }
}

function forIn() {
  var i,
      ctx = M.generator();
  return ctx.scopeBH(_1);

  function _1(ctx) {
    var loop;
    loop = ctx.forInIterator({
      a: 1
    });
    return ctx._loop = loop, _2(ctx);
  }

  function _2(ctx) {
    var loop = ctx._loop,
        a,
        b;
    b = loop.incr();
    a = loop = b;
    if (!a.done) return ctx._loop = loop, _3(ctx);else {
      return ctx.pure(ctx);
    }
  }

  function _3(ctx) {
    var loop = ctx._loop;
    i = loop.value;
    return ctx.yldBH(i, _2);
  }
}

function while1() {
  var ctx = M.generator();
  return ctx.scopeBH(_1);

  function _1(ctx) {
    var i;
    i = 0;
    return ctx._i = i, _2(ctx);
  }

  function _2(ctx) {
    var i = ctx._i,
        a;
    a = i++;
    return ctx._i = i, ctx.yldBH(a, _3);
  }

  function _3(ctx, a) {
    var i = ctx._i;
    if (a < 3) return ctx._i = i, _4(ctx);else {
      i = 0;
      return ctx.pure(ctx);
    }
  }

  function _4(ctx) {
    var i = ctx._i,
        a;
    a = i++;
    return ctx._i = i, ctx.yldBH(a, _2);
  }
}

function catchBlock2() {
  var e,
      ctx = M.generator();
  return ctx.scopeBH(_1);

  function _1(ctx) {
    var i;
    i = 0;
    return ctx._i = i, _2(ctx);
  }

  function _2(ctx) {
    var i = ctx._i;

    try {
      return ctx.yldBH(i === 3, _3, _4);
    } catch (ex) {
      return _4(ctx, ex);
    }
  }

  function _3(ctx, a) {
    var i = ctx._i;

    try {
      if (a) {
        throw new Error(`AAAAAAAAA${i++}`);
      }

      return ctx._i = i, ctx.yldBH(`a${i}`, _7, _4);
    } catch (ex) {
      return ctx._i = i, _4(ctx, ex);
    }
  }

  function _4(ctx, ex) {
    var i = ctx._i;
    e = ex;
    return ctx.yldBH(`e${i}`, _5);
  }

  function _5(ctx) {
    return ctx.yldBH(e, _6);
  }

  function _6(ctx) {
    var i = ctx._i;
    return ctx.pure(ctx, i);
  }

  function _7(ctx) {
    var i = ctx._i;
    i++;
    return ctx._i = i, _2(ctx);
  }

  function _8(ctx) {
    return ctx.pure(ctx);
  }
}

function closure2() {
  var j,
      sub = function sub(k) {
    var ctx = M.generator();
    return ctx._k = k, ctx.scopeBH(_1);

    function _1(ctx) {
      var k = ctx._k,
          a;
      a = k++;
      return ctx._k = undefined, ctx.yldBH(a, _2);
    }

    function _2(ctx) {
      j;
      return ctx.pure(ctx);
    }
  },
      ctx = M.generator();

  return ctx.scopeBH(_1);

  function _1(ctx) {
    var k, m, a, b;
    k = 0;
    j = 1;
    m = 0;
    a = k++;
    b = m++;
    return ctx._m = m, ctx.yldBH(a + j + b, _2);
  }

  function _2(ctx) {
    var m = ctx._m,
        a;
    a = m++;
    return ctx._m = undefined, ctx.yldBH(a, _3);
  }

  function _3(ctx) {
    return ctx.pure(ctx, sub);
  }
}