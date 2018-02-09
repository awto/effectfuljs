(function () {
  var e;
  return M.jumpH(_1, _9);

  function _1() {
    return M.chainBH(eff(2), _2, _9);
  }

  function _2() {
    return M.chainBH(eff(3), _3, _9);
  }

  function _3(a) {
    if (a) {
      return M.jumpH(_6, _8);
    } else {
      throw new Error('error');
    }
  }

  function _4(ex) {
    e = ex;
    return M.chainBH(eff(5), _5, _8);
  }

  function _5() {
    return M.chainBH(eff(6), _6, _8);
  }

  function _6() {
    return M.chainBH(eff(7), _7, _8);
  }

  function _7() {
    return M.pure();
  }

  function _8(e) {
    return M.raise(e);
  }

  function _9(a) {
    return M.jumpH(_4, _8, a);
  }
});