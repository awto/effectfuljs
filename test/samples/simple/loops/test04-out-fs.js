function a() {
  return M.jM(eff1(), _1);

  function _1() {
    return M.jMB(eff2(), _2);
  }

  function _2(i) {
    return _3(i);
  }

  function _3(i) {
    if (i < 10) return _4(i);else {
      return eff7(i);
    }
  }

  function _4(i) {
    var j;
    return M.jM2(eff3(i, j), _5, j, i);
  }

  function _5(j, i) {
    return M.jM1(eff4(j++), _6, i);
  }

  function _6(i) {
    i++;
    return M.jR1(_3, i);
  }
}