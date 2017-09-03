(function () {
  var e;

  try {
    return M.jBH(eff(1), _1, _4);
  } catch (ex) {
    return _4(ex);
  }

  function _1(a) {
    try {
      if (a) return _2();else return _3();
    } catch (ex) {
      return _4(ex);
    }
  }

  function _2() {
    try {
      return M.jH(eff('before break'), _6, _4);
    } catch (ex) {
      return _4(ex);
    }
  }

  function _3() {
    try {
      return M.jH(eff(2), _5, _4);
    } catch (ex) {
      return _4(ex);
    }
  }

  function _4(ex) {
    e = ex;
    return M.j(eff(3), _5);
  }

  function _5() {
    return M.j(eff(4), _6);
  }

  function _6() {
    return M.j(eff(5), _7);
  }

  function _7() {
    return M.pure();
  }
});