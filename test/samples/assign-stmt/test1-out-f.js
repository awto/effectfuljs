function aS() {
  var b1;
  return M.jB(eff(1), _1);

  function _1(a) {
    b1 = a;
    return M.j(eff('a'), _2);
  }

  function _2() {
    return M.j(eff('b'), _3);
  }

  function _3() {
    return M.pure();
  }
}

exports.a = a;

function a() {
  var b1;
  b1 = 0;
  return M.jB(eff(1), _1);

  function _1(a) {
    b1 = a;
    return M.j(eff('a'), _2);
  }

  function _2() {
    return M.j(eff('b'), _3);
  }

  function _3() {
    return M.pure();
  }
}

function a1() {
  var a;
  return M.jB(eff(1), _1);

  function _1(b) {
    a = b;
    return M.j(eff('a'), _2);
  }

  function _2() {
    return M.j(eff('b'), _3);
  }

  function _3() {
    return M.pure();
  }
}

function bS() {
  var b1, b2;
  return M.jB(eff(1), _1);

  function _1(a) {
    b1 = a;
    return M.jB(eff(2), _2);
  }

  function _2(a) {
    b2 = a;
    return M.j(eff(b1), _3);
  }

  function _3() {
    return M.j(eff(b2), _4);
  }

  function _4() {
    return M.pure();
  }
}

function b() {
  var b1, b2;
  return M.jB(eff(1), _1);

  function _1(a) {
    b1 = a;
    return M.jB(eff(2), _2);
  }

  function _2(a) {
    b2 = a;
    return M.j(eff(b1), _3);
  }

  function _3() {
    return M.j(eff(b2), _4);
  }

  function _4() {
    b1 = b2 = 100;
    return M.pure();
  }
}

function b1() {
  var a, c;
  return M.jB(eff(1), _1);

  function _1(b) {
    a = b;
    return M.jB(eff(2), _2);
  }

  function _2(b) {
    c = b;
    return M.j(eff(a), _3);
  }

  function _3() {
    return M.j(eff(c), _4);
  }

  function _4() {
    return M.pure();
  }
}

function c() {
  var a, b, c, d, e, f, g, j, x, y, z;
  return M.jB(eff(1), _1);

  function _1(c) {
    a = c;
    b = 2;
    return M.jB(eff(3), _2);
  }

  function _2(a) {
    c = a;
    return M.j(eff('a'), _3);
  }

  function _3() {
    return M.j(eff('b'), _4);
  }

  function _4() {
    return M.jB(eff(4), _5);
  }

  function _5(a) {
    d = a;
    e = 5;
    return M.jB(eff(6), _6);
  }

  function _6(a) {
    f = a;
    return M.jB(eff(7), _7);
  }

  function _7(a) {
    g = a;
    j = 8;
    return M.jB(eff('x'), _8);
  }

  function _8(a) {
    x = a;
    y = 'y';
    return M.jB(eff('z'), _9);
  }

  function _9(a) {
    z = a;
    return M.j(eff(9), _10);
  }

  function _10() {
    a = b = c = d = e = f = g = j = x = y = z = 1000;
    return M.j(eff(10), _11);
  }

  function _11() {
    return M.pure();
  }
}

function d() {
  return M.jB(eff1('a'), _1);

  function _1(a) {
    return M.jB(eff(2), _2, a);
  }

  function _2(b, a) {
    a.some = b;
    return M.jB(eff('b'), _3);
  }

  function _3(a) {
    return M.jB(eff(3), _4, a);
  }

  function _4(b, a) {
    a.some += b;
    return M.jB(eff('c'), _5);
  }

  function _5(a) {
    a.some++;
    some['d']--;
    return M.pure();
  }
}

function e1() {
  var cc;
  return M.jB(eff(1, cc), _1);

  function _1(a) {
    cc = a;
    return M.jB(eff(2, cc), _2);
  }

  function _2(a) {
    cc = a;
    return M.j(eff(2, cc), _3);
  }

  function _3() {
    return M.pure();
  }
}

function e2() {
  var cc, _cc;

  return M.jB(eff(1, cc), _1);

  function _1(a) {
    cc = a;
    return M.jB(eff(2, cc), _2);
  }

  function _2(a) {
    cc = a;
    return M.j(eff(3, cc), _3);
  }

  function _3() {
    return M.jB(eff(4, _cc), _4);
  }

  function _4(a) {
    _cc = a;
    return M.jB(eff(5, _cc), _5);
  }

  function _5(a) {
    _cc = a;
    return M.j(eff(6, _cc), _6);
  }

  function _6() {
    return M.j(eff(7, cc), _7);
  }

  function _7() {
    return M.pure();
  }
}