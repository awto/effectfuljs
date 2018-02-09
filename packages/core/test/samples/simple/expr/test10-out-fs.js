function a() {
  return M.chainBH(eff(1), _1, _4);

  function _1(a) {
    return M.chainBH(eff(2), _2, _4, a);
  }

  function _2(b, a) {
    return M.chainBH(effC(a, b), _3, _4);
  }

  function _3() {
    return M.pure();
  }

  function _4(e) {
    return M.raise(e);
  }
}