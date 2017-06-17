function a() {
  return M.jMB(eff(2), _1);

  function _1(a) {
    loop = M.forInIterator(a);
    return _2();
  }

  function _2() {
    if (loop = loop()) return _3();else return M.pure();
  }

  function _3() {
    var i;
    i = loop.value;
    return M.jMR(eff(i), _2);
  }
}

function b() {
  return M.jMB(eff(2), _1);

  function _1(a) {
    _loop = M.forInIterator(a);
    return _2();
  }

  function _2() {
    if (_loop = _loop()) return _3();else return M.pure();
  }

  function _3() {
    var i;
    i = _loop.value;
    return M.jMR(eff(i), _2);
  }
}

function c() {
  return M.jMB(eff(2), _1);

  function _1(a) {
    loop1 = M.forInIterator(a);
    return _2();
  }

  function _2() {
    if (loop1 = loop1()) return _3();else return M.pure();
  }

  function _3() {
    var i;
    i = loop1.value;
    return M.jMR(eff(i), _2);
  }
}

function d() {
  return M.jMB(eff(2), _1);

  function _1(a) {
    var i;

    for (i in a) {
      console.log(i);
    }

    return M.pure();
  }
}

function e() {
  loop2 = M.forInIterator(obj);
  return _1();

  function _1() {
    if (loop2 = loop2()) return _2();else return M.pure();
  }

  function _2() {
    var i;
    i = loop2.value;
    return M.jMR(eff(i), _1);
  }
}

function f() {
  for (var i in obj) {
    console.log(i);
  }
}

function g() {
  return M.jM(eff('a'), _1);

  function _1() {
    return M.jMB(eff(2), _2);
  }

  function _2(a) {
    loop3 = M.forInIterator(a);
    return _3();
  }

  function _3() {
    var i;

    if (loop3 = loop3()) {
      i = loop3.value;
      return M.jMB1(eff(i), _4, i);
    } else return _6();
  }

  function _4(a, i) {
    if (a) return _3();else {
      return M.jMB(effB(i), _5);
    }
  }

  function _5(a) {
    if (a) return _6();else {
      return M.jMR(eff('c'), _3);
    }
  }

  function _6() {
    return eff('z');
  }
}

function h() {
  return M.jM(eff('a'), _1);

  function _1() {
    loop4 = M.forInIterator(obj);
    return _2();
  }

  function _2() {
    var j;

    if (loop4 = loop4()) {
      j = loop4.value;
      console.log('j');
      return M.jM1(effA(j), _3, j);
    } else return _12();
  }

  function _3(j) {
    return M.jMB1(eff(j), _4, j);
  }

  function _4(a, j) {
    loop5 = M.forInIterator(a);
    return _5(j);
  }

  function _5(j) {
    var i;

    if (loop5 = loop5()) {
      i = loop5.value;
      console.log('b');
      return M.jM2(eff('b'), _6, j, i);
    } else return _11(j);
  }

  function _6(j, i) {
    return M.jMB2(eff(i + j), _7, j, i);
  }

  function _7(a, j, i) {
    if (a) return _2();else {
      return M.jMB2(effB(i + j), _8, j, i);
    }
  }

  function _8(a, j, i) {
    if (a) return _12();else {
      return M.jMB2(eff(i), _9, j, i);
    }
  }

  function _9(a, j, i) {
    if (a) return _5(j);else {
      return M.jMB1(effB(i), _10, j);
    }
  }

  function _10(a, j) {
    if (a) return _11(j);else {
      return M.jM1R(eff('c'), _5, j);
    }
  }

  function _11(j) {
    return M.jMR(effB(j), _2);
  }

  function _12() {
    return eff('z');
  }
}