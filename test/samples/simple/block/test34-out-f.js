function a() {
  return M.j(eff(1), _1);

  function _1() {
    return M.jB(eff(2), _2);
  }

  function _2(a) {
    if (a) return _3();else return _5();
  }

  function _3() {
    return M.j(eff3(), _4);
  }

  function _4() {
    return M.j(eff4(), _5);
  }

  function _5() {
    return M.pure();
  }
}