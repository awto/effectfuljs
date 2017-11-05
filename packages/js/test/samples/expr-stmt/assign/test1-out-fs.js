function aS() {
  var b1;
  return M.chain(eff(1), _1, _4);

  function _1(a) {
    b1 = a;
    return M.chain(eff('a'), _2, _4);
  }

  function _2() {
    return M.chain(eff('b'), _3, _4);
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
  return M.chain(eff(1), _1, _4);

  function _1(a) {
    var b1;
    b1 = a;
    return M.chain(eff('a'), _2, _4);
  }

  function _2() {
    return M.chain(eff('b'), _3, _4);
  }

  function _3() {
    return M.pure();
  }

  function _4(e) {
    return M.raise(e);
  }
}

function a1() {
  return M.chain(eff(1), _1, _4);

  function _1(b) {
    var a;
    a = b;
    return M.chain(eff('a'), _2, _4);
  }

  function _2() {
    return M.chain(eff('b'), _3, _4);
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
  return M.chain(eff(1), _1, _5);

  function _1(a) {
    b1 = a;
    return M.chain(eff(2), _2, _5);
  }

  function _2(a) {
    b2 = a;
    return M.chain(eff(b1), _3, _5);
  }

  function _3() {
    return M.chain(eff(b2), _4, _5);
  }

  function _4() {
    return M.pure();
  }

  function _5(e) {
    return M.raise(e);
  }
}

function b() {
  return M.chain(eff(1), _1, _5);

  function _1(a) {
    var b1;
    b1 = a;
    return M.chain(eff(2), _2, _5, b1);
  }

  function _2(a, b1) {
    var b2;
    b2 = a;
    return M.chain(eff(b1), _3, _5, b2);
  }

  function _3(b2) {
    return M.chain(eff(b2), _4, _5);
  }

  function _4() {
    var b1, b2;
    b1 = b2 = 100;
    return M.pure();
  }

  function _5(e) {
    return M.raise(e);
  }
}

function b1() {
  return M.chain(eff(1), _1, _5);

  function _1(c) {
    var a, b;
    b = a = c;
    return M.chain(eff(2), _2, _5, a, b);
  }

  function _2(e, a, b) {
    var c, d;
    d = c = e;
    b, d;
    return M.chain(eff(a), _3, _5, c);
  }

  function _3(c) {
    return M.chain(eff(c), _4, _5);
  }

  function _4() {
    return M.pure();
  }

  function _5(e) {
    return M.raise(e);
  }
}

function c() {
  return M.chain(eff(1), _1, _12);

  function _1(c) {
    var a, b;
    a = c;
    b = 2;
    return M.chain(eff(3), _2, _12);
  }

  function _2(a) {
    var c;
    c = a;
    return M.chain(eff('a'), _3, _12);
  }

  function _3() {
    return M.chain(eff('b'), _4, _12);
  }

  function _4() {
    return M.chain(eff(4), _5, _12);
  }

  function _5(a) {
    var d, e;
    d = a;
    e = 5;
    return M.chain(eff(6), _6, _12);
  }

  function _6(a) {
    var f;
    f = a;
    return M.chain(eff(7), _7, _12);
  }

  function _7(a) {
    var g, j;
    g = a;
    j = 8;
    return M.chain(eff('x'), _8, _12);
  }

  function _8(a) {
    var x, y;
    x = a;
    y = 'y';
    return M.chain(eff('z'), _9, _12);
  }

  function _9(a) {
    var z;
    z = a;
    return M.chain(eff(9), _10, _12);
  }

  function _10() {
    var a, b, c, d, e, f, g, j, x, y, z;
    a = b = c = d = e = f = g = j = x = y = z = 1000;
    return M.chain(eff(10), _11, _12);
  }

  function _11() {
    return M.pure();
  }

  function _12(e) {
    return M.raise(e);
  }
}

function d() {
  return M.chain(eff1('a'), _1, _6);

  function _1(a) {
    return M.chain(eff(2), _2, _6, a);
  }

  function _2(b, a) {
    a.some = b;
    return M.chain(eff('b'), _3, _6);
  }

  function _3(a) {
    return M.chain(eff(3), _4, _6, a);
  }

  function _4(b, a) {
    a.some += b;
    return M.chain(eff('c'), _5, _6);
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
  return M.chain(eff(1, cc), _1, _4);

  function _1(a) {
    var cc;
    cc = a;
    return M.chain(eff(2, cc), _2, _4);
  }

  function _2(a) {
    var cc;
    cc = a;
    return M.chain(eff(2, cc), _3, _4);
  }

  function _3() {
    return M.pure();
  }

  function _4(e) {
    return M.raise(e);
  }
}

function e2() {
  var cc;
  return M.chain(eff(1, cc), _1, _8);

  function _1(a) {
    var cc;
    cc = a;
    return M.chain(eff(2, cc), _2, _8);
  }

  function _2(a) {
    var cc;
    cc = a;
    return M.chain(eff(3, cc), _3, _8, cc);
  }

  function _3(cc) {
    var _cc;

    return M.chain(eff(4, _cc), _4, _8, cc);
  }

  function _4(a, cc) {
    var _cc;

    _cc = a;
    return M.chain(eff(5, _cc), _5, _8, cc);
  }

  function _5(a, cc) {
    var _cc;

    _cc = a;
    return M.chain(eff(6, _cc), _6, _8, cc);
  }

  function _6(cc) {
    return M.chain(eff(7, cc), _7, _8);
  }

  function _7() {
    return M.pure();
  }

  function _8(e) {
    return M.raise(e);
  }
}