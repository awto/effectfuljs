// *- DEFAULT
import * as G from '@effectful/es';

function v() {
  var i, loop;
  return G.scope(_1);

  function _1() {
    loop = G.iterator([1, 2, 3]);
    return _2();
  }

  function _2() {
    if (loop = loop()) return _3();else {
      return G.yldStarMB(z, _4);
    }
  }

  function _3() {
    i = loop.value;
    return G.yldMR(i, _2);
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
    const a = eff(3);
    return G.yldStarMB(a, _4);
  }

  function _4(a) {
    var b;
    const b = eff(3);
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

function v1() {
  return G.scope(_1);

  function _1() {
    return G.yldMB(z, _2);
  }

  function _2(a) {
    console.log(a);
    return G.pure();
  }
}

function c1() {
  return G.scope(_1);

  function _1() {
    return G.yldM(z, G.pure);
  }
}

function d1() {
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
    const a = eff(3);
    return G.yldMB(a, _4);
  }

  function _4(a) {
    var b;
    console.log(a + eff(3));
    const b = eff(4);
    return G.yldMB(b, _5);
  }

  function _5(a) {
    return G.yldM(eff(a), G.pure);
  }
}