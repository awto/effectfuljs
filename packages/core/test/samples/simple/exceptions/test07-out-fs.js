function a() {
  return M.jumpH(_1, _7);

  function _1() {
    return M.chainBH(eff(1), _2, _5, _4, _5);
  }

  function _2(fc, fe, err) {
    console.log(1);
    return M.chainBH(eff(2), _3, _5, fc, fe, err);
  }

  function _3(fc, fe, err) {
    console.log(2);
    return M.jumpH(fc, fe, err);
  }

  function _4() {
    return M.pure();
  }

  function _5(e) {
    return M.raise(e);
  }

  function _6(err) {
    return M.raise(err);
  }

  function _7(a) {
    return M.jumpH(_2, _5, _6, _5, a);
  }
}