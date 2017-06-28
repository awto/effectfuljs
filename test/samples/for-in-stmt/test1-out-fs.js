function a() {
  return M.jMB(eff(2), _1);

  function _1(a) {
    var loop;
    loop = M.forInIterator(a);
    return _2(loop);
  }

  function _2(loop) {
    if (loop = loop()) return _3(loop);else return M.pure();
  }

  function _3(loop) {
    var i;
    i = loop.value;
    return M.jM1R(eff(i), _2, loop);
  }
}

function b() {
  return M.jMB(eff(2), _1);

  function _1(a) {
    var loop;
    loop = M.forInIterator(a);
    return _2(loop);
  }

  function _2(loop) {
    if (loop = loop()) return _3(loop);else return M.pure();
  }

  function _3(loop) {
    var i;
    i = loop.value;
    return M.jM1R(eff(i), _2, loop);
  }
}

function c() {
  return M.jMB(eff(2), _1);

  function _1(a) {
    var loop;
    loop = M.forInIterator(a);
    return _2(loop);
  }

  function _2(loop) {
    if (loop = loop()) return _3(loop);else return M.pure();
  }

  function _3(loop) {
    var i;
    i = loop.value;
    return M.jM1R(eff(i), _2, loop);
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
  var loop;
  loop = M.forInIterator(obj);
  return _1(loop);

  function _1(loop) {
    if (loop = loop()) return _2(loop);else return M.pure();
  }

  function _2(loop) {
    var i;
    i = loop.value;
    return M.jM1R(eff(i), _1, loop);
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
    var loop;
    loop = M.forInIterator(a);
    return _3(loop);
  }

  function _3(loop) {
    var i;

    if (loop = loop()) {
      i = loop.value;
      return M.jMB2(eff(i), _4, i, loop);
    } else return _6();
  }

  function _4(a, i, loop) {
    if (a) return _3(loop);else {
      return M.jMB1(effB(i), _5, loop);
    }
  }

  function _5(a, loop) {
    if (a) return _6();else {
      return M.jM1R(eff('c'), _3, loop);
    }
  }

  function _6() {
    return eff('z');
  }
}

function h() {
  return M.jM(eff('a'), _1);

  function _1() {
    var loop;
    loop = M.forInIterator(obj);
    return _2(loop);
  }

  function _2(loop) {
    var j;

    if (loop = loop()) {
      j = loop.value;
      console.log('j');
      return M.jM2(effA(j), _3, j, loop);
    } else return _12();
  }

  function _3(j, loop) {
    return M.jMB2(eff(j), _4, j, loop);
  }

  function _4(a, j, loop) {
    var _loop;

    _loop = M.forInIterator(a);
    return _5(j, loop, _loop);
  }

  function _5(j, loop, _loop) {
    var i;

    if (_loop = _loop()) {
      i = _loop.value;
      console.log('b');
      return M.jM4(eff('b'), _6, j, i, loop, _loop);
    } else return _11(j, loop);
  }

  function _6(j, i, loop, _loop) {
    return M.jMB4(eff(i + j), _7, j, i, loop, _loop);
  }

  function _7(a, j, i, loop, _loop) {
    if (a) return _2(loop);else {
      return M.jMB4(effB(i + j), _8, j, i, loop, _loop);
    }
  }

  function _8(a, j, i, loop, _loop) {
    if (a) return _12();else {
      return M.jMB4(eff(i), _9, j, i, loop, _loop);
    }
  }

  function _9(a, j, i, loop, _loop) {
    if (a) return _5(j, loop, _loop);else {
      return M.jMB3(effB(i), _10, j, loop, _loop);
    }
  }

  function _10(a, j, loop, _loop) {
    if (a) return _11(j, loop);else {
      return M.jM3R(eff('c'), _5, j, loop, _loop);
    }
  }

  function _11(j, loop) {
    return M.jM1R(effB(j), _2, loop);
  }

  function _12() {
    return eff('z');
  }
}