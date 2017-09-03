function a() {
  return M.j(eff1(), _1);

  function _1() {
    return M.j(eff2(), _2);
  }

  function _2() {
    return M.j(eff3(), _3);
  }

  function _3() {
    return M.jB(eff(4), _4);
  }

  function _4(a) {
    if (a) {
      return M.j(eff(5), _5);
    } else {
      return M.pure();
    }
  }

  function _5() {
    return M.pure();
  }
}