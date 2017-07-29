function aS() {
  var b1;
  return M.jMB(eff(1), _1);

  function _1(a) {
    b1 = a;
    return M.jM(eff('a'), _2);
  }

  function _2() {
    return eff('b');
  }
}

function a() {
  var b1;
  b1 = 0;
  return M.jMB(eff(1), _1);

  function _1(b1) {
    return M.jM(eff('a'), _2);
  }

  function _2() {
    return eff('b');
  }
}

function a1() {
  return M.jMB(eff(1), _1);

  function _1(a) {
    return M.jM(eff('a'), _2);
  }

  function _2() {
    return eff('b');
  }
}

function bS() {
  var b1, b2;
  return M.jMB(eff(1), _1);

  function _1(a) {
    b1 = a;
    return M.jMB(eff(2), _2);
  }

  function _2(a) {
    b2 = a;
    return M.jM(eff(b1), _3);
  }

  function _3() {
    return eff(b2);
  }
}

function b() {
  return M.jMB(eff(1), _1);

  function _1(b1) {
    return M.jMB(eff(2), _2, b1);
  }

  function _2(b2, b1) {
    return M.jM(eff(b1), _3, b2);
  }

  function _3(b2) {
    return M.jM(eff(b2), _4);
  }

  function _4() {
    var b1, b2;
    b1 = b2 = 100;
    return M.pure();
  }
}

function b1() {
  return M.jMB(eff(1), _1);

  function _1(a) {
    return M.jMB(eff(2), _2, a);
  }

  function _2(c, a) {
    return M.jM(eff(a), _3, c);
  }

  function _3(c) {
    return eff(c);
  }
}

function c() {
  return M.jMB(eff(1), _1);

  function _1(a) {
    var b;
    b = 2;
    return M.jMB(eff(3), _2);
  }

  function _2(c) {
    return M.jM(eff('a'), _3);
  }

  function _3() {
    return M.jM(eff('b'), _4);
  }

  function _4() {
    return M.jMB(eff(4), _5);
  }

  function _5(d) {
    var e;
    e = 5;
    return M.jMB(eff(6), _6);
  }

  function _6(f) {
    return M.jMB(eff(7), _7);
  }

  function _7(g) {
    var j;
    j = 8;
    return M.jMB(eff('x'), _8);
  }

  function _8(x) {
    var y;
    y = 'y';
    return M.jMB(eff('z'), _9);
  }

  function _9(z) {
    return M.jM(eff(9), _10);
  }

  function _10() {
    var a, b, c, d, e, f, g, j, x, y, z;
    a = b = c = d = e = f = g = j = x = y = z = 1000;
    return eff(10);
  }
}

function d() {
  return M.jMB(eff1('a'), _1);

  function _1(a) {
    return M.jMB(eff(2), _2, a);
  }

  function _2(b, a) {
    a.some = b;
    return M.jMB(eff('b'), _3);
  }

  function _3(a) {
    return M.jMB(eff(3), _4, a);
  }

  function _4(b, a) {
    a.some += b;
    return M.jMB(eff('c'), _5);
  }

  function _5(a) {
    a.some++;
    some['d']--;
    return M.pure();
  }
}

function e1() {
  var cc;
  return M.jMB(eff(1, cc), _1);

  function _1(cc) {
    return M.jMB(eff(2, cc), _2);
  }

  function _2(cc) {
    return eff(2, cc);
  }
}

function e2() {
  var cc;
  return M.jMB(eff(1, cc), _1);

  function _1(cc) {
    return M.jMB(eff(2, cc), _2);
  }

  function _2(cc) {
    return M.jM(eff(3, cc), _3);
  }

  function _3(cc) {
    var _cc;

    return M.jMB(eff(4, _cc), _4, cc);
  }

  function _4(_cc, cc) {
    return M.jMB(eff(5, _cc), _5, cc);
  }

  function _5(_cc, cc) {
    return M.jM(eff(6, _cc), _6, cc);
  }

  function _6(cc) {
    return eff(7, cc);
  }
}