function a() {
  var i, loop;
  return M.jMB(eff(2), _1);

  function _1(a) {
    loop = M.forInIterator(a);
    return _2();
  }

  function _2() {
    if (loop = loop()) return _3();else return M.pure();
  }

  function _3() {
    i = loop.value;
    return M.jMR(eff(i), _2);
  }
}

function b() {
  var i, loop;
  return M.jMB(eff(2), _1);

  function _1(a) {
    loop = M.forInIterator(a);
    return _2();
  }

  function _2() {
    if (loop = loop()) return _3();else return M.pure();
  }

  function _3() {
    i = loop.value;
    return M.jMR(eff(i), _2);
  }
}

function c() {
  var i, loop;
  return M.jMB(eff(2), _1);

  function _1(a) {
    loop = M.forInIterator(a);
    return _2();
  }

  function _2() {
    if (loop = loop()) return _3();else return M.pure();
  }

  function _3() {
    i = loop.value;
    return M.jMR(eff(i), _2);
  }
}

function d() {
  var i;
  return M.jMB(eff(2), _1);

  function _1(a) {
    for (i in a) {
      console.log(i);
    }

    return M.pure();
  }
}

function e() {
  var i, loop;
  loop = M.forInIterator(obj);
  return _1();

  function _1() {
    if (loop = loop()) return _2();else return M.pure();
  }

  function _2() {
    i = loop.value;
    return M.jMR(eff(i), _1);
  }
}

function f() {
  for (var i in obj) {
    console.log(i);
  }
}

function g() {
  var i, loop;
  return M.jM(eff('a'), _1);

  function _1() {
    return M.jMB(eff(2), _2);
  }

  function _2(a) {
    loop = M.forInIterator(a);
    return _3();
  }

  function _3() {
    if (loop = loop()) {
      i = loop.value;
      return M.jMB(eff(i), _4);
    } else return _6();
  }

  function _4(a) {
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
  var j, i, loop, _loop;

  return M.jM(eff('a'), _1);

  function _1() {
    loop = M.forInIterator(obj);
    return _2();
  }

  function _2() {
    if (loop = loop()) {
      j = loop.value;
      console.log('j');
      return M.jM(effA(j), _3);
    } else return _12();
  }

  function _3() {
    return M.jMB(eff(j), _4);
  }

  function _4(a) {
    _loop = M.forInIterator(a);
    return _5();
  }

  function _5() {
    if (_loop = _loop()) {
      i = _loop.value;
      console.log('b');
      return M.jM(eff('b'), _6);
    } else return _11();
  }

  function _6() {
    return M.jMB(eff(i + j), _7);
  }

  function _7(a) {
    if (a) return _2();else {
      return M.jMB(effB(i + j), _8);
    }
  }

  function _8(a) {
    if (a) return _12();else {
      return M.jMB(eff(i), _9);
    }
  }

  function _9(a) {
    if (a) return _5();else {
      return M.jMB(effB(i), _10);
    }
  }

  function _10(a) {
    if (a) return _11();else {
      return M.jMR(eff('c'), _5);
    }
  }

  function _11() {
    return M.jMR(effB(j), _2);
  }

  function _12() {
    return eff('z');
  }
}