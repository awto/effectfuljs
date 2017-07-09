function a() {
  return M.jM(eff1(), _1);

  function _1() {
    return M.jM(eff2(), _2);
  }

  function _2() {
    return M.jMB(eff(3), _3);
  }

  function _3(a) {
    if (a) return _4();else {
      return eff7();
    }
  }

  function _4() {
    return M.jM(eff5(), _5);
  }

  function _5() {
    return M.jM(eff6(), _6);
  }

  function _6() {
    return M.jRM(eff4(), _2);
  }
}