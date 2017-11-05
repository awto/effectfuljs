var _v = M.generatorFunction(v);

var _c = M.generatorFunction(c);

var _d = M.generatorFunction(d);

var _e = M.generatorFunction(e);

var _f = M.generatorFunction(f);

var _v1 = M.generatorFunction(v1);

var _c1 = M.generatorFunction(c1);

var _d1 = M.generatorFunction(d1);

var _e1 = M.generatorFunction(e1);

var _aw1 = M.asyncGeneratorFunction(aw1);

var _ag1 = M.asyncGeneratorFunction(ag1);

var _ag2 = M.asyncGeneratorFunction(ag2);

var _ag3 = M.asyncGeneratorFunction(ag3);

var _ag4 = M.asyncGeneratorFunction(ag4);

var _ag5 = M.asyncGeneratorFunction(ag5);

var _ag6 = M.asyncFunction(ag6);

var _ag7 = M.asyncGeneratorFunction(ag7);

// *- DEFAULT
import * as G from '@effectful/es';

function v(j) {
  var i, loop, e, ex;
  return M.scope(_1, _7, _6);

  function _1() {
    loop = M.iterator([1, 2, 3]);
    return M.jump(_2, _7, _6);
  }

  function _2() {
    if (!(loop = loop.step()).done) {
      i = loop.value;
      return M.jump(_3, _8, _6);
    } else {
      return M.yldStar(z, _5, _7, _6);
    }
  }

  function _3() {
    return M.repeat(i + j, _2, _7, _6);
  }

  function _4() {
    e = ex;

    if (loop.exit) {
      loop.exit();
    }

    throw e;
  }

  function _5(a) {
    console.log(a);
    return M.pure();
  }

  function _6(r) {
    return M.pure(r);
  }

  function _7(e) {
    return M.raise(e);
  }

  function _8(a) {
    ex = a;
    return M.jump(_4, _7, _6);
  }
}

function c() {
  return M.scope(_1, _4, _3);

  function _1() {
    return M.yldStar(z, _2, _4, _3);
  }

  function _2() {
    return M.pure();
  }

  function _3(r) {
    return M.pure(r);
  }

  function _4(e) {
    return M.raise(e);
  }
}

function d() {
  var r;
  return M.scope(_1, _5, _4);

  function _1() {
    return M.yld(z, _2, _5, _4);
  }

  function _2() {
    return M.yldStar(x, _3, _5, _4);
  }

  function _3() {
    return M.pure(y);
  }

  function _4(r) {
    return M.pure(r);
  }

  function _5(e) {
    return M.raise(e);
  }
}

function e() {
  var r;
  return M.scope(_1, _6, _5);

  function _1() {
    return M.yld(z, _2, _6, _5);
  }

  function _2() {
    return M.yldStar(x, _3, _6, _5);
  }

  function _3(b) {
    if (b) {
      return M.pure(y);
    } else {
      return M.yldStar(a, _4, _6, _5);
    }
  }

  function _4() {
    return M.pure(r);
  }

  function _5(r) {
    return M.pure(r);
  }

  function _6(e) {
    return M.raise(e);
  }
}

function f() {
  var a, r;
  return M.scope(_1, _8, _7);

  function _1() {
    var a;
    a = eff(1);
    return M.yld(a, _2, _8, _7);
  }

  function _2() {
    var a;
    a = eff(2);
    return M.yld(a, _3, _8, _7);
  }

  function _3() {
    var a;
    a = eff(3);
    return M.yldStar(a, _4, _8, _7);
  }

  function _4(c) {
    var b;
    a = c;
    b = eff(3);
    return M.yld(b, _5, _8, _7);
  }

  function _5(b) {
    var c;
    console.log(a + b);
    c = eff(eff(4));
    return M.yldStar(c, _6, _8, _7);
  }

  function _6() {
    return M.pure(10);
  }

  function _7(r) {
    return M.pure(r);
  }

  function _8(e) {
    return M.raise(e);
  }
}

function v1(z) {
  return M.scope(_1, _4, _3);

  function _1() {
    return M.yld(z, _2, _4, _3);
  }

  function _2(a) {
    console.log(a);
    return M.pure();
  }

  function _3(r) {
    return M.pure(r);
  }

  function _4(e) {
    return M.raise(e);
  }
}

function c1(z) {
  return M.scope(_1, _4, _3);

  function _1() {
    return M.yld(z, _2, _4, _3);
  }

  function _2() {
    return M.pure();
  }

  function _3(r) {
    return M.pure(r);
  }

  function _4(e) {
    return M.raise(e);
  }
}

function d1(z, x) {
  return M.scope(_1, _5, _4);

  function _1() {
    return M.yld(z, _2, _5, _4);
  }

  function _2() {
    return M.yld(x, _3, _5, _4);
  }

  function _3() {
    return M.pure();
  }

  function _4(r) {
    return M.pure(r);
  }

  function _5(e) {
    return M.raise(e);
  }
}

function e1() {
  return M.scope(_1, _8, _7);

  function _1() {
    var a;
    a = eff(1);
    return M.yld(a, _2, _8, _7);
  }

  function _2() {
    var a;
    a = eff(2);
    return M.yld(a, _3, _8, _7);
  }

  function _3() {
    var a;
    a = eff(3);
    return M.yld(a, _4, _8, _7);
  }

  function _4(a) {
    var b, c;
    b = eff(3);
    console.log(a + b);
    c = eff(4);
    return M.yld(c, _5, _8, _7);
  }

  function _5(b) {
    var a;
    a = eff(b);
    return M.yld(a, _6, _8, _7);
  }

  function _6() {
    return M.pure();
  }

  function _7(r) {
    return M.pure(r);
  }

  function _8(e) {
    return M.raise(e);
  }
}

function aw1(i) {
  return M.scope(_1, _5, _4);

  function _1() {
    var a;
    a = eff(i);
    return M.chain(a, _2, _5, _4);
  }

  function _2() {
    var a;
    i++;
    a = eff(i);
    return M.chain(a, _3, _5, _4);
  }

  function _3() {
    return M.pure();
  }

  function _4(r) {
    return M.pure(r);
  }

  function _5(e) {
    return M.raise(e);
  }
}

function ag1(i) {
  var j, loop, e, ex;
  return M.scope(_1, _8, _7);

  function _1() {
    loop = M.iteratorM(something);
    return M.jump(_2, _8, _7);
  }

  function _2() {
    return M.chain(loop.step(), _3, _8, _7);
  }

  function _3(c) {
    var a, b;
    b = loop = c;
    a = b.done;

    if (!a) {
      j = loop.value;
      return M.jump(_4, _9, _7);
    } else {
      return M.pure();
    }
  }

  function _4() {
    p('H', i, j);
    return M.repeat(_2, _8, _7);
  }

  function _5() {
    e = ex;

    if (loop.exit) {
      return M.chain(loop.exit(), _6, _8, _7);
    } else {
      return M.jump(_6, _8, _7);
    }
  }

  function _6() {
    throw e;
  }

  function _7(r) {
    return M.pure(r);
  }

  function _8(e) {
    return M.raise(e);
  }

  function _9(a) {
    ex = a;
    return M.jump(_5, _8, _7);
  }
}

function ag2(i) {
  var j, loop, e, ex;
  return M.scope(_1, _9, _8);

  function _1() {
    loop = M.iteratorM(something);
    return M.jump(_2, _9, _8);
  }

  function _2(a) {
    return M.chain(loop.step(), _3, _9, _8);
  }

  function _3(c) {
    var a, b;
    b = loop = c;
    a = b.done;

    if (!a) {
      j = loop.value;
      return M.jump(_4, _10, _8);
    } else {
      return M.pure();
    }
  }

  function _4() {
    return M.chain(somethingElse, _5, _10, _8);
  }

  function _5(a) {
    i = a;
    return M.repeat(_2, _9, _8);
  }

  function _6() {
    e = ex;

    if (loop.exit) {
      return M.chain(loop.exit(), _7, _9, _8);
    } else {
      return M.jump(_7, _9, _8);
    }
  }

  function _7() {
    throw e;
  }

  function _8(r) {
    return M.pure(r);
  }

  function _9(e) {
    return M.raise(e);
  }

  function _10(a) {
    ex = a;
    return M.jump(_6, _9, _8);
  }
}

function ag3(i) {
  var j, loop, e, ex, r;
  return M.scope(_1, _16, _15);

  function _1() {
    return M.yld(i, _2, _16, _15);
  }

  function _2() {
    var a;
    a = eff(i);
    return M.chain(a, _3, _16, _15);
  }

  function _3(a) {
    return M.yld(a, _4, _16, _15);
  }

  function _4() {
    loop = M.iteratorM(something());
    return M.jump(_5, _16, _15);
  }

  function _5(a) {
    return M.chain(loop.step(), _6, _16, _15);
  }

  function _6(c) {
    var a, b;
    b = loop = c;
    a = b.done;

    if (!a) {
      j = loop.value;
      return M.jump(_7, _17, _15);
    } else {
      return M.pure(i);
    }
  }

  function _7() {
    return M.yld(i + j, _8, _17, _15);
  }

  function _8(b) {
    var a;
    a = eff(j);
    return M.chain(a, _9, _17, _15);
  }

  function _9(b) {
    var a;
    a = eff(i - b);
    return M.chain(a, _10, _17, _15);
  }

  function _10(a) {
    return M.yld(a, _11, _17, _15);
  }

  function _11(a) {
    var b;
    i = a;
    b = eff(2, j);
    return M.yldStar(b, _12, _17, _15);
  }

  function _12(a) {
    i = a;
    return M.repeat(_5, _16, _15);
  }

  function _13() {
    e = ex;

    if (loop.exit) {
      return M.chain(loop.exit(), _14, _16, _15);
    } else {
      return M.jump(_14, _16, _15);
    }
  }

  function _14() {
    throw e;
  }

  function _15(r) {
    return M.pure(r);
  }

  function _16(e) {
    return M.raise(e);
  }

  function _17(a) {
    ex = a;
    return M.jump(_13, _16, _15);
  }
}

function ag4() {
  return M.scope(_1, _5, _4);

  function _1() {
    var a;
    a = eff2();
    return M.yld(a, _2, _5, _4);
  }

  function _2(b) {
    var a;
    a = eff1(b);
    return M.chain(a, _3, _5, _4);
  }

  function _3() {
    return M.pure();
  }

  function _4(r) {
    return M.pure(r);
  }

  function _5(e) {
    return M.raise(e);
  }
}

function ag5(i) {
  return M.scope(_1, _5, _4);

  function _1() {
    return M.chain(i, _2, _5, _4);
  }

  function _2(a) {
    return M.chain(a, _3, _5, _4);
  }

  function _3() {
    return M.pure();
  }

  function _4(r) {
    return M.pure(r);
  }

  function _5(e) {
    return M.raise(e);
  }
}

function ag6(i) {
  return M.scope(_1, _5);

  function _1() {
    return M.chain(i, _2, _5);
  }

  function _2(a) {
    return M.chain(a, _3, _5);
  }

  function _3(a) {
    return M.chain(a, _4, _5);
  }

  function _4() {
    return M.pure();
  }

  function _5(e) {
    return M.raise(e);
  }
}

function ag7(i) {
  var a, b, c, d, e, f;
  return M.scope(_1, _16, _15);

  function _1() {
    var a;
    a = eff1(i);
    return M.yld(a, _2, _16, _15);
  }

  function _2() {
    var b;
    a = eff(2, i);
    b = eff3();
    return M.chain(b, _3, _16, _15);
  }

  function _3(c) {
    var a;
    b = c;
    a = eff4();
    return M.yld(a, _4, _16, _15);
  }

  function _4(b) {
    var a;
    c = b;
    a = eff5();
    return M.chain(a, _5, _16, _15);
  }

  function _5(a) {
    return M.chain(a, _6, _16, _15);
  }

  function _6(b) {
    var a;
    d = b;
    a = eff6();
    return M.chain(a, _7, _16, _15);
  }

  function _7(a) {
    return M.yld(a, _8, _16, _15);
  }

  function _8(b) {
    var a;
    e = b;
    a = eff7();
    return M.yld(a, _9, _16, _15);
  }

  function _9(a) {
    return M.yld(a, _10, _16, _15);
  }

  function _10(b) {
    var a;
    f = b;
    a = eff8();
    return M.yld(a, _11, _16, _15);
  }

  function _11(a) {
    return M.chain(a, _12, _16, _15);
  }

  function _12(h) {
    var g;
    g = eff1(a, b, c, d, e, f, h);
    return M.chain(g, _13, _16, _15);
  }

  function _13(a) {
    return M.yld(a, _14, _16, _15);
  }

  function _14() {
    return M.pure();
  }

  function _15(r) {
    return M.pure(r);
  }

  function _16(e) {
    return M.raise(e);
  }
}