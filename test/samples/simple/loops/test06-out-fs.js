function a() {
  return M.jM(eff1(), _1);

  function _1() {
    return M.jMB(eff2(), _2);
  }

  function _2(i) {
    return _3();
  }

  function _3(i) {
    return M.jMB(eff(3), _4, i);
  }

  function _4(a, i) {
    if (i !== a) return _5(i);else {
      return eff7(i);
    }
  }

  function _5(i) {
    return M.jM(eff5(i), _6, i);
  }

  function _6(i) {
    return M.jM(eff6(i), _7, i);
  }

  function _7(i) {
    return M.jMB(eff4(i), _8);
  }

  function _8(i) {
    return M.jR(_3);
  }
}