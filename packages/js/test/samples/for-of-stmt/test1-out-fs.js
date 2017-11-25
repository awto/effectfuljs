function a() {
  var i, loop;
  loop = M.iterator(some);
  return M.jumpH(_1, _5, loop);

  function _1(loop) {
    if (!(loop = loop.step()).done) {
      i = loop.value;
      return M.jumpRH(_2, _6, loop);
    } else {
      return M.chainBH(eff(2), _4, _5);
    }
  }

  function _2(loop) {
    return M.chainBH(eff(1), _1, _5, loop);
  }

  function _3(ex) {
    var e;
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
    return M.jumpH(_3, _5, a);
  }
}

function b() {
  var i;
  return M.chainBH(eff('d'), _1, _6);

  function _1(b) {
    var loop, a;
    a = M.iterator(b);
    loop = a;
    return M.jumpH(_2, _6, loop);
  }

  function _2(loop) {
    if (!(loop = loop.step()).done) {
      i = loop.value;
      return M.jumpRH(_3, _7, loop);
    } else {
      return M.chainBH(eff(i), _5, _6);
    }
  }

  function _3(loop) {
    return M.chainBH(eff(i), _2, _6, loop);
  }

  function _4(ex) {
    var e;
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
    return M.jumpH(_4, _6, a);
  }
}

function c() {
  var i, j, loop;
  loop = M.iterator(some);
  return M.jumpH(_1, _8, loop);

  function _1(loop) {
    if (!(loop = loop.step()).done) {
      i = loop.value;
      return M.jumpRH(_2, _9, loop);
    } else {
      return M.chainBH(eff(i, j), _7, _8);
    }
  }

  function _2(loop) {
    var _loop;

    _loop = M.iterator(other);
    return M.jumpRH(_3, _9, loop, _loop);
  }

  function _3(loop, _loop) {
    if (!(_loop = _loop.step()).done) {
      j = _loop.value;
      return M.jumpRH(_4, _10, loop, _loop);
    } else {
      return M.jumpH(_1, _8, loop);
    }
  }

  function _4(loop, _loop) {
    return M.chainBH(eff(i, j), _3, _9, loop, _loop);
  }

  function _5(ex) {
    var e;
    e = ex;

    if (_loop.exit) {
      _loop.exit();
    }

    throw e;
  }

  function _6(ex) {
    var e;
    e = ex;

    if (loop.exit) {
      loop.exit();
    }

    throw e;
  }

  function _7() {
    return M.pure();
  }

  function _8(e) {
    return M.raise(e);
  }

  function _9(a) {
    return M.jumpH(_6, _8, a);
  }

  function _10(a) {
    return M.jumpH(_5, _9, a);
  }
}

function d() {
  var i, loop;
  loop = M.iterator(some);
  return M.jumpH(_1, _5, loop);

  function _1(loop) {
    if (!(loop = loop.step()).done) {
      i = loop.value;
      return M.jumpRH(_2, _6, loop);
    } else {
      return M.chainBH(eff(2), _4, _5);
    }
  }

  function _2(loop) {
    return M.chainBH(eff(1), _1, _5, loop);
  }

  function _3(ex) {
    var e;
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
    return M.jumpH(_3, _5, a);
  }
}

function p() {
  for (var i of some) {
    console.log(1);
  }

  console.log(2);
}