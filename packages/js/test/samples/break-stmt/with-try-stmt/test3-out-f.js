(function () {
  var e, ex;
  return M.jumpH(_1, _6);

  function _1() {
    return M.chainBH(eff(2), _3, _5);
  }

  function _2() {
    e = ex;
    return M.chainBH(eff(3), _3, _5);
  }

  function _3() {
    return M.chainBH(eff(4), _4, _5);
  }

  function _4() {
    return M.pure();
  }

  function _5(e) {
    return M.raise(e);
  }

  function _6(a) {
    ex = a;
    return M.jumpH(_2, _5);
  }
});