function a() {
  return M.chainBH(eff0(), _1, _6);

  function _1() {
    var i;
    i = 0;
    i++;
    return M.chainBH(eff1(i), _2, _6, i);
  }

  function _2(i) {
    if (t) {
      return M.chainBH(eff2(i), _3, _6, i);
    } else {
      return M.chainBH(eff3(i), _4, _6, i);
    }
  }

  function _3(i) {
    i++;
    return M.chainBH(eff4(i), _4, _6, i);
  }

  function _4(i) {
    return M.chainBH(eff5(i), _5, _6);
  }

  function _5() {
    return M.pure();
  }

  function _6(e) {
    return M.raise(e);
  }
}