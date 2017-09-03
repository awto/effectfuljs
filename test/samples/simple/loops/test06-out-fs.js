function a() {
  return M.j(eff1(), _1);

  function _1() {
    return M.jB(eff2(), _2);
  }

  function _2(i) {
    return _3(i);
  }

  function _3(i) {
    return M.jB(eff(3), _4, i);
  }

  function _4(a, i) {
    if (i !== a) return _5(i);else {
      return M.j(eff7(i), _9);
    }
  }

  function _5(i) {
    return M.j(eff5(i), _6, i);
  }

  function _6(i) {
    return M.j(eff6(i), _7, i);
  }

  function _7(i) {
    return M.jB(eff4(i), _8);
  }

  function _8(i) {
    return M.jR(_3, i);
  }

  function _9() {
    return M.pure();
  }
}