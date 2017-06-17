function a() {
  return M.jM(eff1(), _1);

  function _1() {
    return M.jM(eff2(), _2);
  }

  function _2() {
    return M.jM(eff3(), _3);
  }

  function _3() {
    return M.jMB(eff(4), _4);
  }

  function _4(a) {
    if (a) {
      return eff(5);
    } else return M.pure();
  }
}