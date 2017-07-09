// *- DEFAULT
import * as G from '@effectful/es';

function v(j) {
  var i;
  return G.scope(_1);

  function _1() {
    var loop;
    loop = G.iterator([1, 2, 3]);
    return _2(loop);
  }

  function _2(loop) {
    if (loop = loop()) return _3(loop);else {
      return G.yldStarMB(z, _4);
    }
  }

  function _3(loop) {
    i = loop.value;
    return G.yldM1(i + j, _2, loop);
  }

  function _4(a) {
    console.log(a);
    return G.pure();
  }
}

function c() {
  return G.scope(_1);

  function _1() {
    return G.yldStarM(z, G.pure);
  }
}

function d() {
  return G.scope(_1);

  function _1() {
    return G.yldM(z, _2);
  }

  function _2() {
    return G.yldStarM(x, _3);
  }

  function _3() {
    return G.pure(y);
  }
}

function e() {
  return G.scope(_1);

  function _1() {
    return G.yldM(z, _2);
  }

  function _2() {
    return G.yldStarMB(x, _3);
  }

  function _3(a) {
    if (a) {
      return G.pure(y);
    }
  }

  function _4() {
    return G.yldStarM(a, G.pure);
  }
}

function f() {
  return G.scope(_1);

  function _1() {
    return G.yldM(eff(1), _2);
  }

  function _2() {
    return G.yldM(eff(2), _3);
  }

  function _3() {
    var a;
    a = eff(3);
    return G.yldStarMB(a, _4);
  }

  function _4(a) {
    var b;
    b = eff(3);
    return G.yldMB1(b, _5, a);
  }

  function _5(b, a) {
    console.log(a + b);
    return G.yldStarM(eff(eff(4)), _6);
  }

  function _6() {
    return G.pure(10);
  }
}

function v1(z) {
  return G.scope(_1);

  function _1() {
    return G.yldMB(z, _2);
  }

  function _2(a) {
    console.log(a);
    return G.pure();
  }
}

function c1(z) {
  return G.scope(_1);

  function _1() {
    return G.yldM(z, G.pure);
  }
}

function d1(z, x) {
  return G.scope(_1);

  function _1() {
    return G.yldM(z, _2);
  }

  function _2() {
    return G.yldM(x, G.pure);
  }
}

function e1() {
  return G.scope(_1);

  function _1() {
    return G.yldM(eff(1), _2);
  }

  function _2() {
    return G.yldM(eff(2), _3);
  }

  function _3() {
    var a;
    a = eff(3);
    return G.yldMB(a, _4);
  }

  function _4(a) {
    var b;
    console.log(a + eff(3));
    b = eff(4);
    return G.yldMB(b, _5);
  }

  function _5(a) {
    return G.yldM(eff(a), G.pure);
  }
}

function aw1(i) {
  return G.scope1(_1, i);

  function _1(i) {
    return G.jM1(eff(i), _2, i);
  }

  function _2(i) {
    i++;
    return eff(i);
  }
}

function ag1(i) {
  var j;
  return G.scope(_1);

  function _1() {
    var loop;
    loop = G.iteratorM(something);
    return _2(loop);
  }

  function _2(loop) {
    return G.jMB(loop(), _3);
  }

  function _3(loop) {
    if (loop) return _4(loop);else return G.pure();
  }

  function _4(loop) {
    j = loop.value;
    p('H', i, j);
    return G.jR1(_2, loop);
  }
}

function ag2(i) {
  var j;
  return G.scope(_1);

  function _1() {
    var loop;
    loop = G.iteratorM(something);
    return _2(loop);
  }

  function _2(loop) {
    return G.jMB(loop(), _3);
  }

  function _3(loop) {
    if (loop) return _4(loop);else return G.pure();
  }

  function _4(loop) {
    j = loop.value;
    return G.jMB1(somethingElse, _5, loop);
  }

  function _5(i, loop) {
    return G.jR1(_2, loop);
  }
}

function ag3(i) {
  var j;
  return G.scope1(_1, i);

  function _1(i) {
    return G.yldM1(i, _2, i);
  }

  function _2(i) {
    var a;
    a = eff(i);
    return G.jMB1(a, _3, i);
  }

  function _3(a, i) {
    return G.yldM1(a, _4, i);
  }

  function _4(i) {
    var loop;
    loop = G.iteratorM(something());
    return _5(i, loop);
  }

  function _5(i, loop) {
    return G.jMB1(loop(), _6, i);
  }

  function _6(loop, i) {
    if (loop) return _7(i, loop);else {
      return G.pure(i);
    }
  }

  function _7(i, loop) {
    j = loop.value;
    return G.yldM2(i + j, _8, i, loop);
  }

  function _8(i, loop) {
    var a;
    a = eff(j);
    return G.jMB2(a, _9, i, loop);
  }

  function _9(b, i, loop) {
    var a;
    a = eff(i - b);
    return G.jMB1(a, _10, loop);
  }

  function _10(a, loop) {
    return G.yldMB1(a, _11, loop);
  }

  function _11(i, loop) {
    var a;
    a = eff(2, j);
    return G.yldStarMB1(a, _12, loop);
  }

  function _12(i, loop) {
    return G.jR2(_5, i, loop);
  }
}

function ag4() {
  return G.scope(_1);

  function _1() {
    var a;
    a = eff2();
    return G.yldMB(a, _2);
  }

  function _2(a) {
    return eff1(a);
  }
}

function ag5(i) {
  return G.scope(_1);

  function _1() {
    return G.jMB(i, _2);
  }

  function _2(a) {
    return a;
  }
}

function ag6(i) {
  return G.scope(_1);

  function _1() {
    return G.jMB(i, _2);
  }

  function _2(a) {
    return G.jMB(a, _3);
  }

  function _3(a) {
    return a;
  }
}

function ag7(i) {
  return G.scope(_1);

  function _1() {
    return G.yldM(eff1(i), _2);
  }

  function _2() {
    var b, a;
    b = eff(2, i);
    a = eff3();
    return G.jMB1(a, _3, b);
  }

  function _3(c, b) {
    var a;
    a = eff4();
    return G.yldMB2(a, _4, b, c);
  }

  function _4(d, b, c) {
    var a;
    a = eff5();
    return G.jMB3(a, _5, b, c, d);
  }

  function _5(a, b, c, d) {
    return G.jMB3(a, _6, b, c, d);
  }

  function _6(e, b, c, d) {
    var a;
    a = eff6();
    return G.jMB4(a, _7, b, c, d, e);
  }

  function _7(a, b, c, d, e) {
    return G.yldMB4(a, _8, b, c, d, e);
  }

  function _8(f, b, c, d, e) {
    var a;
    a = eff7();
    return G.yldMB5(a, _9, b, c, d, e, f);
  }

  function _9(a, b, c, d, e, f) {
    return G.yldMB5(a, _10, b, c, d, e, f);
  }

  function _10(g, b, c, d, e, f) {
    var a;
    a = eff8();
    return G.yldMBN(a, _11, [b, c, d, e, f, g]);
  }

  function _11(a, [b, c, d, e, f, g]) {
    return G.jMBN(a, _12, [b, c, d, e, f, g]);
  }

  function _12(h, [b, c, d, e, f, g]) {
    var a;
    a = eff1(b, c, d, e, f, g, h);
    return G.jMB(a, _13);
  }

  function _13(a) {
    return G.yldM(a, G.pure);
  }
}