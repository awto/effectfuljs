function a() {
  return M.jumpH(_1, _6);

  function _1() {
    return M.chainBH(eff(1), _2, _4, _3, _4);
  }

  function _2(fc, fe, err) {
    console.log('fin');
    return M.jumpH(fc, fe, err);
  }

  function _3() {
    return M.pure();
  }

  function _4(e) {
    return M.raise(e);
  }

  function _5(err) {
    return M.raise(err);
  }

  function _6(a) {
    return M.jumpH(_2, _4, _5, _4, a);
  }
}