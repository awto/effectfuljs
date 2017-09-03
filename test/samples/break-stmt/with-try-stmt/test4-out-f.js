(function () {
  var e;

  try {
    return M.jH(eff(2), _1, _5);
  } catch (ex) {
    return _5(ex);
  }

  function _1() {
    try {
      return M.jBH(eff(3), _2, _5);
    } catch (ex) {
      return _5(ex);
    }
  }

  function _2(a) {
    try {
      if (a) return _7();else return _3();
    } catch (ex) {
      return _5(ex);
    }
  }

  function _3() {
    try {
      throw new Error('error');
      return _4();
    } catch (ex) {
      return _5(ex);
    }
  }

  function _4() {
    try {
      return M.jH(eff(4), _6, _5);
    } catch (ex) {
      return _5(ex);
    }
  }

  function _5(ex) {
    e = ex;
    return M.j(eff(5), _6);
  }

  function _6() {
    return M.j(eff(6), _7);
  }

  function _7() {
    return M.j(eff(7), _8);
  }

  function _8() {
    return M.pure();
  }
});