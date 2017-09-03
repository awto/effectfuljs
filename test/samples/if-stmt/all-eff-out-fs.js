function a() {
  return M.jB(eff(1), _1);

  function _1(a) {
    if (a) return _2();else {
      return M.jB(eff(3), _4);
    }
  }

  function _2() {
    return M.jB(eff(2), _3);
  }

  function _3(a) {
    return M.pure(a);
  }

  function _4(a) {
    return M.pure(a);
  }

  function _5() {
    return M.pure();
  }
}