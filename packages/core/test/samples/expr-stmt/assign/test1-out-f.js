import * as M from '@effectful/core';

function aS() {
  var b1;
  return M.chainBH(eff(1), _1, _4);

  function _1(a) {
    b1 = a;
    return M.chainBH(eff('a'), _2, _4);
  }

  function _2() {
    return M.chainBH(eff('b'), _3, _4);
  }

  function _3() {
    return M.pure();
  }

  function _4(e) {
    return M.raise(e);
  }
}

exports.a = a;

function a() {
  var b1;
  b1 = 0;
  return M.chainBH(eff(1), _1, _4);

  function _1(a) {
    b1 = a;
    return M.chainBH(eff('a'), _2, _4);
  }

  function _2() {
    return M.chainBH(eff('b'), _3, _4);
  }

  function _3() {
    return M.pure();
  }

  function _4(e) {
    return M.raise(e);
  }
}

function a1() {
  var a;
  return M.chainBH(eff(1), _1, _4);

  function _1(b) {
    a = b;
    return M.chainBH(eff('a'), _2, _4);
  }

  function _2() {
    return M.chainBH(eff('b'), _3, _4);
  }

  function _3() {
    return M.pure();
  }

  function _4(e) {
    return M.raise(e);
  }
}

function bS() {
  var b1, b2;
  return M.chainBH(eff(1), _1, _5);

  function _1(a) {
    b1 = a;
    return M.chainBH(eff(2), _2, _5);
  }

  function _2(a) {
    b2 = a;
    return M.chainBH(eff(b1), _3, _5);
  }

  function _3() {
    return M.chainBH(eff(b2), _4, _5);
  }

  function _4() {
    return M.pure();
  }

  function _5(e) {
    return M.raise(e);
  }
}

function b() {
  var b1, b2;
  return M.chainBH(eff(1), _1, _5);

  function _1(a) {
    b1 = a;
    return M.chainBH(eff(2), _2, _5);
  }

  function _2(a) {
    b2 = a;
    return M.chainBH(eff(b1), _3, _5);
  }

  function _3() {
    return M.chainBH(eff(b2), _4, _5);
  }

  function _4() {
    b1 = b2 = 100;
    return M.pure();
  }

  function _5(e) {
    return M.raise(e);
  }
}

function b1() {
  var a, c, b;
  return M.chainBH(eff(1), _1, _5);

  function _1(c) {
    b = a = c;
    return M.chainBH(eff(2), _2, _5);
  }

  function _2(e) {
    var d;
    d = c = e;
    b, d;
    return M.chainBH(eff(a), _3, _5);
  }

  function _3() {
    return M.chainBH(eff(c), _4, _5);
  }

  function _4() {
    return M.pure();
  }

  function _5(e) {
    return M.raise(e);
  }
}

function c() {
  var a, b, c, d, e, f, g, j, x, y, z;
  return M.chainBH(eff(1), _1, _12);

  function _1(c) {
    a = c;
    b = 2;
    return M.chainBH(eff(3), _2, _12);
  }

  function _2(a) {
    c = a;
    return M.chainBH(eff('a'), _3, _12);
  }

  function _3() {
    return M.chainBH(eff('b'), _4, _12);
  }

  function _4() {
    return M.chainBH(eff(4), _5, _12);
  }

  function _5(a) {
    d = a;
    e = 5;
    return M.chainBH(eff(6), _6, _12);
  }

  function _6(a) {
    f = a;
    return M.chainBH(eff(7), _7, _12);
  }

  function _7(a) {
    g = a;
    j = 8;
    return M.chainBH(eff('x'), _8, _12);
  }

  function _8(a) {
    x = a;
    y = 'y';
    return M.chainBH(eff('z'), _9, _12);
  }

  function _9(a) {
    z = a;
    return M.chainBH(eff(9), _10, _12);
  }

  function _10() {
    a = b = c = d = e = f = g = j = x = y = z = 1000;
    return M.chainBH(eff(10), _11, _12);
  }

  function _11() {
    return M.pure();
  }

  function _12(e) {
    return M.raise(e);
  }
}

function d() {
  var a, b;
  return M.chainBH(eff1('a'), _1, _6);

  function _1(b) {
    a = b;
    return M.chainBH(eff(2), _2, _6);
  }

  function _2(b) {
    a.some = b;
    return M.chainBH(eff('b'), _3, _6);
  }

  function _3(a) {
    b = a;
    return M.chainBH(eff(3), _4, _6);
  }

  function _4(a) {
    b.some += a;
    return M.chainBH(eff('c'), _5, _6);
  }

  function _5(a) {
    a.some++;
    some['d']--;
    return M.pure();
  }

  function _6(e) {
    return M.raise(e);
  }
}

function e1() {
  var cc;
  return M.chainBH(eff(1, cc), _1, _4);

  function _1(a) {
    cc = a;
    return M.chainBH(eff(2, cc), _2, _4);
  }

  function _2(a) {
    cc = a;
    return M.chainBH(eff(2, cc), _3, _4);
  }

  function _3() {
    return M.pure();
  }

  function _4(e) {
    return M.raise(e);
  }
}

function e2() {
  var cc, _cc;

  return M.chainBH(eff(1, cc), _1, _8);

  function _1(a) {
    cc = a;
    return M.chainBH(eff(2, cc), _2, _8);
  }

  function _2(a) {
    cc = a;
    return M.chainBH(eff(3, cc), _3, _8);
  }

  function _3() {
    return M.chainBH(eff(4, _cc), _4, _8);
  }

  function _4(a) {
    _cc = a;
    return M.chainBH(eff(5, _cc), _5, _8);
  }

  function _5(a) {
    _cc = a;
    return M.chainBH(eff(6, _cc), _6, _8);
  }

  function _6() {
    return M.chainBH(eff(7, cc), _7, _8);
  }

  function _7() {
    return M.pure();
  }

  function _8(e) {
    return M.raise(e);
  }
}