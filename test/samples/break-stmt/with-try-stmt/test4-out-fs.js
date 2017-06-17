(function () {
  return _1();

  function _1() {
    try {
      return M.jME(eff(2), _2, _5);
    } catch (e) {
      return _5();
    }
  }

  function _2() {
    try {
      return M.jMBE(eff(3), _3, _5);
    } catch (e) {
      return _5();
    }
  }

  function _3(a) {
    try {
      if (a) return _7();else {
        return M.jME(M.throw(new Error('error')), _4, _5);
      }
    } catch (e) {
      return _5();
    }
  }

  function _4() {
    try {
      return M.jME(eff(4), _6, _5);
    } catch (e) {
      return _5();
    }
  }

  function _5(ex) {
    var e;
    e = ex;
    return M.jM(eff(5), _6);
  }

  function _6() {
    return M.jM(eff(6), _7);
  }

  function _7() {
    return eff(7);
  }
});