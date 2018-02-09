// *- without EOB exits
function b() {
  return M.chainBH(eff(1), _1, _6);

  function _1(a) {
    switch (a) {
      case 1:
        return M.chainBH(effB(1), _2, _6);

      case 2:
        return M.jumpH(_3, _6);

      default:
        return M.chainBH(eff(4), _5, _6);
    }
  }

  function _2(a) {
    if (a) {
      return M.pure();
    } else {
      return M.jumpH(_3, _6);
    }
  }

  function _3() {
    return M.chainBH(effB(2), _4, _6);
  }

  function _4(a) {
    if (a) {
      return M.pure();
    } else {
      return M.chainBH(effB(3), _5, _6);
    }
  }

  function _5() {
    return M.pure();
  }

  function _6(e) {
    return M.raise(e);
  }
}