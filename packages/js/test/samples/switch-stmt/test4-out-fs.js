function a() {
  return M.chainBH(eff(1), _1, _4);

  function _1(a) {
    switch (a) {
      case 1:
        return M.chainBH(effB(1), _2, _4);

      case 2:
        return M.jumpH(_2, _4);

      default:
        return M.chainBH(effB(3), _3, _4);
    }
  }

  function _2() {
    return M.chainBH(effB(2), _3, _4);
  }

  function _3() {
    return M.pure();
  }

  function _4(e) {
    return M.raise(e);
  }
}