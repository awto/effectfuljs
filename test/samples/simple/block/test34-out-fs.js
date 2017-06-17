function a() {
  return M.jM(eff(1), _1);

  function _1() {
    return M.jMB(eff(2), _2);
  }

  function _2(a) {
    if (a) return _3();else return M.pure();
  }

  function _3() {
    return M.jM(eff3(), _4);
  }

  function _4() {
    return eff4();
  }
}