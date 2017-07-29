function a() {
  var i;
  return M.jMB(eff(2), _1);

  function _1(b) {
    var loop, a;
    a = M.forInIterator(b);
    loop = a;
    return _2(loop);
  }

  function _2(loop) {
    var a, b;
    b = loop.step();
    a = loop = b;
    if (!a.done) return _3(loop);else return M.pure();
  }

  function _3(loop) {
    i = loop.value;
    return M.jRM(eff(i), _2, loop);
  }
}

function b() {
  var i;
  return M.jMB(eff(2), _1);

  function _1(b) {
    var loop, a;
    a = M.forInIterator(b);
    loop = a;
    return _2(loop);
  }

  function _2(loop) {
    var a, b;
    b = loop.step();
    a = loop = b;
    if (!a.done) return _3(loop);else return M.pure();
  }

  function _3(loop) {
    i = loop.value;
    return M.jRM(eff(i), _2, loop);
  }
}

function c() {
  var i;
  return M.jMB(eff(2), _1);

  function _1(b) {
    var loop, a;
    a = M.forInIterator(b);
    loop = a;
    return _2(loop);
  }

  function _2(loop) {
    var a, b;
    b = loop.step();
    a = loop = b;
    if (!a.done) return _3(loop);else return M.pure();
  }

  function _3(loop) {
    i = loop.value;
    return M.jRM(eff(i), _2, loop);
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
  return _1(loop);

  function _1(loop) {
    var a, b;
    b = loop.step();
    a = loop = b;
    if (!a.done) return _2(loop);else return M.pure();
  }

  function _2(loop) {
    i = loop.value;
    return M.jRM(eff(i), _1, loop);
  }
}

function f() {
  for (var i in obj) {
    console.log(i);
  }
}

function g() {
  var i;
  return M.jM(eff('a'), _1);

  function _1() {
    return M.jMB(eff(2), _2);
  }

  function _2(b) {
    var loop, a;
    a = M.forInIterator(b);
    loop = a;
    return _3(loop);
  }

  function _3(loop) {
    var a, b;
    b = loop.step();
    a = loop = b;

    if (!a.done) {
      i = loop.value;
      return M.jMB(eff(i), _4, loop);
    } else return _6();
  }

  function _4(a, loop) {
    if (a) return _3(loop);else {
      return M.jMB(effB(i), _5, loop);
    }
  }

  function _5(a, loop) {
    if (a) return _6();else {
      return M.jRM(eff('c'), _3, loop);
    }
  }

  function _6() {
    return eff('z');
  }
}

function h() {
  var j, i;
  return M.jM(eff('a'), _1);

  function _1() {
    var loop;
    loop = M.forInIterator(obj);
    return _2(loop);
  }

  function _2(loop) {
    var a, b;
    b = loop.step();
    a = loop = b;

    if (!a.done) {
      j = loop.value;
      console.log('j');
      return M.jM(effA(j), _3, loop);
    } else return _12();
  }

  function _3(loop) {
    return M.jMB(eff(j), _4, loop);
  }

  function _4(b, loop) {
    var _loop, a;

    a = M.forInIterator(b);
    _loop = a;
    return _5(loop, _loop);
  }

  function _5(loop, _loop) {
    var a, b;
    b = _loop.step();
    a = _loop = b;

    if (!a.done) {
      i = _loop.value;
      console.log('b');
      return M.jM(eff('b'), _6, loop, _loop);
    } else return _11(loop);
  }

  function _6(loop, _loop) {
    return M.jMB(eff(i + j), _7, loop, _loop);
  }

  function _7(a, loop, _loop) {
    if (a) return _2(loop);else {
      return M.jMB(effB(i + j), _8, loop, _loop);
    }
  }

  function _8(a, loop, _loop) {
    if (a) return _12();else {
      return M.jMB(eff(i), _9, loop, _loop);
    }
  }

  function _9(a, loop, _loop) {
    if (a) return _5(loop, _loop);else {
      return M.jMB(effB(i), _10, loop, _loop);
    }
  }

  function _10(a, loop, _loop) {
    if (a) return _11(loop);else {
      return M.jRM(eff('c'), _5, loop, _loop);
    }
  }

  function _11(loop) {
    return M.jRM(effB(j), _2, loop);
  }

  function _12() {
    return eff('z');
  }
}