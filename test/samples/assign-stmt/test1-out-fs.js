function a() {
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

function b() {
  return M.jMB(eff(1), _1);

  function _1(b1) {
    return M.jMB1(eff(2), _2, b1);
  }

  function _2(b2, b1) {
    return M.jM1(eff(b1), _3, b2);
  }

  function _3(b2) {
    return eff(b2);
  }
}

function b1() {
  return M.jMB(eff(1), _1);

  function _1(a) {
    return M.jMB1(eff(2), _2, a);
  }

  function _2(c, a) {
    return M.jM1(eff(a), _3, c);
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
    return eff(10);
  }
}

function d() {
  return M.jMB(eff1('a'), _1);

  function _1(a) {
    return M.jMB1(eff(2), _2, a);
  }

  function _2(b, a) {
    a.some = b;
    return M.jMB(eff('b'), _3);
  }

  function _3(a) {
    return M.jMB1(eff(3), _4, a);
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