(function () {
  var e;
  return _1();

  function _1() {
    try {
      return M.jMBE(eff(1), _2, _4);
    } catch (e) {
      return _4();
    }
  }

  function _2(a) {
    try {
      if (a) return _3();else {
        return M.jME(eff(2), _5, _4);
      }
    } catch (e) {
      return _4();
    }
  }

  function _3() {
    try {
      return M.jME(eff('before break'), _6, _4);
    } catch (e) {
      return _4();
    }
  }

  function _4() {
    e = ex;
    return M.jM(eff(3), _5);
  }

  function _5() {
    return M.jM(eff(4), _6);
  }

  function _6() {
    return eff(5);
  }
});