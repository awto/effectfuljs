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
    var a, b;
    b = loop.step();
    a = loop = b;
    if (!a.done) return _3(loop);else {
      return G.yldStarMB(z, _4);
    }
  }

  function _3(loop) {
    i = loop.value;
    return G.yldM(i + j, _2, loop);
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
    var a;
    a = eff(1);
    return G.yldM(a, _2);
  }

  function _2() {
    var a;
    a = eff(2);
    return G.yldM(a, _3);
  }

  function _3() {
    var a;
    a = eff(3);
    return G.yldStarMB(a, _4);
  }

  function _4(a) {
    var b;
    b = eff(3);
    return G.yldMB(b, _5, a);
  }

  function _5(b, a) {
    var c, d;
    console.log(a + b);
    d = eff(4);
    c = eff(d);
    return G.yldStarM(c, _6);
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
    var a;
    a = eff(1);
    return G.yldM(a, _2);
  }

  function _2() {
    var a;
    a = eff(2);
    return G.yldM(a, _3);
  }

  function _3() {
    var a;
    a = eff(3);
    return G.yldMB(a, _4);
  }

  function _4(a) {
    var b, c;
    b = eff(3);
    console.log(a + b);
    c = eff(4);
    return G.yldMB(c, _5);
  }

  function _5(b) {
    var a;
    a = eff(b);
    return G.yldM(a, G.pure);
  }
}

function aw1(i) {
  return G.scope(_1);

  function _1() {
    var a;
    a = eff(i);
    return G.jM(a, _2);
  }

  function _2() {
    var a;
    i++;
    a = eff(i);
    return a;
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
    return G.jMB(loop.step(), _3);
  }

  function _3(loop) {
    var a;
    if (!a.done) return _4(loop);else return G.pure();
  }

  function _4(loop) {
    j = loop.value;
    p('H', i, j);
    return G.jR(_2, loop);
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
    return G.jMB(loop.step(), _3);
  }

  function _3(loop) {
    var a;
    if (!a.done) return _4(loop);else return G.pure();
  }

  function _4(loop) {
    j = loop.value;
    return G.jMB(somethingElse, _5, loop);
  }

  function _5(a, loop) {
    i = a;
    return G.jR(_2, loop);
  }
}

function ag3(i) {
  var j;
  return G.scope(_1);

  function _1() {
    return G.yldM(i, _2);
  }

  function _2() {
    var a;
    a = eff(i);
    return G.jMB(a, _3);
  }

  function _3(a) {
    return G.yldM(a, _4);
  }

  function _4() {
    var loop;
    loop = G.iteratorM(something());
    return _5(loop);
  }

  function _5(loop) {
    return G.jMB(loop.step(), _6);
  }

  function _6(loop) {
    var a;
    if (!a.done) return _7(loop);else {
      return G.pure(i);
    }
  }

  function _7(loop) {
    j = loop.value;
    return G.yldM(i + j, _8, loop);
  }

  function _8(loop) {
    var a;
    a = eff(j);
    return G.jMB(a, _9, loop);
  }

  function _9(b, loop) {
    var a;
    a = eff(i - b);
    return G.jMB(a, _10, loop);
  }

  function _10(a, loop) {
    return G.yldMB(a, _11, loop);
  }

  function _11(a, loop) {
    var b;
    i = a;
    b = eff(2, j);
    return G.yldStarMB(b, _12, loop);
  }

  function _12(a, loop) {
    i = a;
    return G.jR(_5, loop);
  }
}

function ag4() {
  return G.scope(_1);

  function _1() {
    var a;
    a = eff2();
    return G.yldMB(a, _2);
  }

  function _2(b) {
    var a;
    a = eff1(b);
    return a;
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
    var a;
    a = eff1(i);
    return G.yldM(a, _2);
  }

  function _2() {
    var b, a;
    b = eff(2, i);
    a = eff3();
    return G.jMB(a, _3, b);
  }

  function _3(c, b) {
    var a;
    a = eff4();
    return G.yldMB(a, _4, b, c);
  }

  function _4(d, b, c) {
    var a;
    a = eff5();
    return G.jMB(a, _5, b, c, d);
  }

  function _5(a, b, c, d) {
    return G.jMB(a, _6, b, c, d);
  }

  function _6(e, b, c, d) {
    var a;
    a = eff6();
    return G.jMB(a, _7, b, c, d, e);
  }

  function _7(a, b, c, d, e) {
    return G.yldMB(a, _8, b, c, d, e);
  }

  function _8(f, b, c, d, e) {
    var a;
    a = eff7();
    return G.yldMB(a, _9, b, c, d, e, f);
  }

  function _9(a, b, c, d, e, f) {
    return G.yldMB(a, _10, b, c, d, e, f);
  }

  function _10(g, b, c, d, e, f) {
    var a;
    a = eff8();
    return G.yldMB(a, _11, [b, c, d, e, f, g]);
  }

  function _11(a, [b, c, d, e, f, g]) {
    return G.jMB(a, _12, [b, c, d, e, f, g]);
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