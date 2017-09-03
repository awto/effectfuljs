// *- DEFAULT
import * as G from '@effectful/es';

function v(j) {
  var i;
  return M.scope(_1);

  function _1() {
    var loop;
    loop = M.iterator([1, 2, 3]);
    return _2(loop);
  }

  function _2(loop) {
    var a, b;
    b = loop.incr();
    a = loop = b;
    if (!a.done) return _3(loop);else {
      return M.yldStarB(z, _4);
    }
  }

  function _3(loop) {
    i = loop.value;
    return M.yld(i + j, _2, loop);
  }

  function _4(a) {
    console.log(a);
    return M.pure();
  }
}

function c() {
  return M.scope(_1);

  function _1() {
    return M.yldStar(z, _2);
  }

  function _2() {
    return M.pure();
  }
}

function d() {
  return M.scope(_1);

  function _1() {
    return M.yld(z, _2);
  }

  function _2() {
    return M.yldStar(x, _3);
  }

  function _3() {
    return M.pure(y);
  }
}

function e() {
  return M.scope(_1);

  function _1() {
    return M.yld(z, _2);
  }

  function _2() {
    return M.yldStarB(x, _3);
  }

  function _3(b) {
    if (b) return _4();else {
      return M.yldStar(a, _5);
    }
  }

  function _4() {
    return M.pure(y);
  }

  function _5() {
    return M.pure();
  }
}

function f() {
  return M.scope(_1);

  function _1() {
    var a;
    a = eff(1);
    return M.yld(a, _2);
  }

  function _2() {
    var a;
    a = eff(2);
    return M.yld(a, _3);
  }

  function _3() {
    var a;
    a = eff(3);
    return M.yldStarB(a, _4);
  }

  function _4(a) {
    var b;
    b = eff(3);
    return M.yldB(b, _5, a);
  }

  function _5(b, a) {
    var c, d;
    console.log(a + b);
    d = eff(4);
    c = eff(d);
    return M.yldStar(c, _6);
  }

  function _6() {
    return M.pure(10);
  }
}

function v1(z) {
  return M.scope(_1);

  function _1() {
    return M.yldB(z, _2);
  }

  function _2(a) {
    console.log(a);
    return M.pure();
  }
}

function c1(z) {
  return M.scope(_1);

  function _1() {
    return M.yld(z, _2);
  }

  function _2() {
    return M.pure();
  }
}

function d1(z, x) {
  return M.scope(_1);

  function _1() {
    return M.yld(z, _2);
  }

  function _2() {
    return M.yld(x, _3);
  }

  function _3() {
    return M.pure();
  }
}

function e1() {
  return M.scope(_1);

  function _1() {
    var a;
    a = eff(1);
    return M.yld(a, _2);
  }

  function _2() {
    var a;
    a = eff(2);
    return M.yld(a, _3);
  }

  function _3() {
    var a;
    a = eff(3);
    return M.yldB(a, _4);
  }

  function _4(a) {
    var b, c;
    b = eff(3);
    console.log(a + b);
    c = eff(4);
    return M.yldB(c, _5);
  }

  function _5(b) {
    var a;
    a = eff(b);
    return M.yld(a, _6);
  }

  function _6() {
    return M.pure();
  }
}

function aw1(i) {
  return M.scope(_1, i);

  function _1(i) {
    var a;
    a = eff(i);
    return M.chain(a, _2, i);
  }

  function _2(i) {
    var a;
    i++;
    a = eff(i);
    return M.chain(a, _3);
  }

  function _3() {
    return M.pure();
  }
}

function ag1(i) {
  var j;
  return M.scope(_1);

  function _1() {
    var loop;
    loop = M.iteratorM(something);
    return _2(loop);
  }

  function _2(loop) {
    return M.chainB(loop.incrM(), _3);
  }

  function _3(loop) {
    var a;
    if (!a.done) return _4(loop);else {
      return M.pure();
    }
  }

  function _4(loop) {
    j = loop.value;
    p('H', i, j);
    return M.jR(_2, loop);
  }
}

function ag2(i) {
  var j;
  return M.scope(_1);

  function _1() {
    var loop;
    loop = M.iteratorM(something);
    return _2(loop);
  }

  function _2(loop) {
    return M.chainB(loop.incrM(), _3);
  }

  function _3(loop) {
    var a;
    if (!a.done) return _4(loop);else {
      return M.pure();
    }
  }

  function _4(loop) {
    j = loop.value;
    return M.chainB(somethingElse, _5, loop);
  }

  function _5(i, loop) {
    return M.jR(_2, loop);
  }
}

function ag3(i) {
  var j;
  return M.scope(_1, i);

  function _1(i) {
    return M.yld(i, _2, i);
  }

  function _2(i) {
    var a;
    a = eff(i);
    return M.chainB(a, _3, i);
  }

  function _3(a, i) {
    return M.yld(a, _4, i);
  }

  function _4(i) {
    var loop;
    loop = M.iteratorM(something());
    return _5(i, loop);
  }

  function _5(i, loop) {
    return M.chainB(loop.incrM(), _6, i);
  }

  function _6(loop, i) {
    var a;
    if (!a.done) return _7(i, loop);else {
      return M.pure(i);
    }
  }

  function _7(i, loop) {
    j = loop.value;
    return M.yld(i + j, _8, i, loop);
  }

  function _8(i, loop) {
    var a;
    a = eff(j);
    return M.chainB(a, _9, i, loop);
  }

  function _9(b, i, loop) {
    var a;
    a = eff(i - b);
    return M.chainB(a, _10, loop);
  }

  function _10(a, loop) {
    return M.yldB(a, _11, loop);
  }

  function _11(i, loop) {
    var a;
    a = eff(2, j);
    return M.yldStarB(a, _12, loop);
  }

  function _12(i, loop) {
    return M.jR(_5, i, loop);
  }
}

function ag4() {
  return M.scope(_1);

  function _1() {
    var a;
    a = eff2();
    return M.yldB(a, _2);
  }

  function _2(b) {
    var a;
    a = eff1(b);
    return M.chain(a, _3);
  }

  function _3() {
    return M.pure();
  }
}

function ag5(i) {
  return M.scope(_1);

  function _1() {
    return M.chainB(i, _2);
  }

  function _2(a) {
    return M.chain(a, _3);
  }

  function _3() {
    return M.pure();
  }
}

function ag6(i) {
  return M.scope(_1);

  function _1() {
    return M.chainB(i, _2);
  }

  function _2(a) {
    return M.chainB(a, _3);
  }

  function _3(a) {
    return M.chain(a, _4);
  }

  function _4() {
    return M.pure();
  }
}

function ag7(i) {
  return M.scope(_1);

  function _1() {
    var a;
    a = eff1(i);
    return M.yld(a, _2);
  }

  function _2() {
    var b, a;
    b = eff(2, i);
    a = eff3();
    return M.chainB(a, _3, b);
  }

  function _3(c, b) {
    var a;
    a = eff4();
    return M.yldB(a, _4, b, c);
  }

  function _4(d, b, c) {
    var a;
    a = eff5();
    return M.chainB(a, _5, b, c, d);
  }

  function _5(a, b, c, d) {
    return M.chainB(a, _6, b, c, d);
  }

  function _6(e, b, c, d) {
    var a;
    a = eff6();
    return M.chainB(a, _7, b, c, d, e);
  }

  function _7(a, b, c, d, e) {
    return M.yldB(a, _8, b, c, d, e);
  }

  function _8(f, b, c, d, e) {
    var a;
    a = eff7();
    return M.yldB(a, _9, b, c, d, e, f);
  }

  function _9([a, b, c, d, e, f]) {
    return M.yldB(a, _10, b, c, d, e, f);
  }

  function _10([g, b, c, d, e, f]) {
    var a;
    a = eff8();
    return M.yldB(a, _11, [b, c, d, e, f, g]);
  }

  function _11([a, b, c, d, e, f, g]) {
    return M.chainB(a, _12, [b, c, d, e, f, g]);
  }

  function _12([h, b, c, d, e, f, g]) {
    var a;
    a = eff1(b, c, d, e, f, g, h);
    return M.chainB(a, _13);
  }

  function _13(a) {
    return M.yld(a, _14);
  }

  function _14() {
    return M.pure();
  }
}