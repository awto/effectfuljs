function a() {
  return M.chainBH(eff(1), _1, _5);

  function _1() {
    return M.chainBH(eff(2), _2, _5);
  }

  function _2(a) {
    if (a) {
      return M.chainBH(eff3(), _3, _5);
    } else {
      b;
      return M.pure();
    }
  }

  function _3() {
    return M.chainBH(eff4(), _4, _5);
  }

  function _4() {
    return M.pure();
  }

  function _5(e) {
    return M.raise(e);
  }
}