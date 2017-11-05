function a() {
  var i, loop, e, ex;
  loop = M.iterator(some);
  return M.jump(_1, _5);

  function _1() {
    if (!(loop = loop.step()).done) {
      i = loop.value;
      return M.jump(_2, _6);
    } else {
      return M.chain(eff(2), _4, _5);
    }
  }

  function _2() {
    return M.repeat(eff(1), _1, _5);
  }

  function _3() {
    e = ex;

    if (loop.exit) {
      loop.exit();
    }

    throw e;
  }

  function _4() {
    return M.pure();
  }

  function _5(e) {
    return M.raise(e);
  }

  function _6(a) {
    ex = a;
    return M.jump(_3, _5);
  }
}

function b() {
  var i, loop, e, ex;
  return M.chain(eff('d'), _1, _6);

  function _1(b) {
    var a;
    a = M.iterator(b);
    loop = a;
    return M.jump(_2, _6);
  }

  function _2() {
    if (!(loop = loop.step()).done) {
      i = loop.value;
      return M.jump(_3, _7);
    } else {
      return M.chain(eff(i), _5, _6);
    }
  }

  function _3() {
    return M.repeat(eff(i), _2, _6);
  }

  function _4() {
    e = ex;

    if (loop.exit) {
      loop.exit();
    }

    throw e;
  }

  function _5() {
    return M.pure();
  }

  function _6(e) {
    return M.raise(e);
  }

  function _7(a) {
    ex = a;
    return M.jump(_4, _6);
  }
}

function c() {
  var i, j, loop, _loop, e, _e, ex, _ex;

  loop = M.iterator(some);
  return M.jump(_1, _8);

  function _1() {
    if (!(loop = loop.step()).done) {
      i = loop.value;
      return M.jump(_2, _9);
    } else {
      return M.chain(eff(i, j), _7, _8);
    }
  }

  function _2() {
    _loop = M.iterator(other);
    return M.jump(_3, _9);
  }

  function _3() {
    if (!(_loop = _loop.step()).done) {
      j = _loop.value;
      return M.jump(_4, _10);
    } else {
      return M.jump(_1, _8);
    }
  }

  function _4() {
    return M.repeat(eff(i, j), _3, _9);
  }

  function _5() {
    e = ex;

    if (_loop.exit) {
      _loop.exit();
    }

    throw e;
  }

  function _6() {
    _e = _ex;

    if (loop.exit) {
      loop.exit();
    }

    throw _e;
  }

  function _7() {
    return M.pure();
  }

  function _8(e) {
    return M.raise(e);
  }

  function _9(a) {
    _ex = a;
    return M.jump(_6, _8);
  }

  function _10(a) {
    ex = a;
    return M.jump(_5, _9);
  }
}

function d() {
  var i, loop, e, ex;
  loop = M.iterator(some);
  return M.jump(_1, _5);

  function _1() {
    if (!(loop = loop.step()).done) {
      i = loop.value;
      return M.jump(_2, _6);
    } else {
      return M.chain(eff(2), _4, _5);
    }
  }

  function _2() {
    return M.repeat(eff(1), _1, _5);
  }

  function _3() {
    e = ex;

    if (loop.exit) {
      loop.exit();
    }

    throw e;
  }

  function _4() {
    return M.pure();
  }

  function _5(e) {
    return M.raise(e);
  }

  function _6(a) {
    ex = a;
    return M.jump(_3, _5);
  }
}

function p() {
  for (var i of some) {
    console.log(1);
  }

  console.log(2);
}