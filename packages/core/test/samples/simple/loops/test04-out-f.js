function a() {
  var j, i;
  return M.chainBH(eff1(), _1, _7);

  function _1() {
    return M.chainBH(eff2(), _2, _7);
  }

  function _2(a) {
    i = a;
    return M.jumpH(_3, _7);
  }

  function _3() {
    if (i < 10) {
      return M.chainBH(eff3(i, j), _4, _7);
    } else {
      return M.chainBH(eff7(i), _6, _7);
    }
  }

  function _4() {
    var a;
    a = j++;
    return M.chainBH(eff4(a), _5, _7);
  }

  function _5() {
    i++;
    return M.jumpRH(_3, _7);
  }

  function _6() {
    return M.pure();
  }

  function _7(e) {
    return M.raise(e);
  }
}