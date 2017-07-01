function a() {
  return M.jM(eff1(1), _1);

  function _1() {
    a;
    return M.jMB(test(1), _2);
  }

  function _2(a) {
    if (a) return _3();else {
      return M.jM(eff(5), _5);
    }
  }

  function _3() {
    b;
    return M.jM(eff(3), _4);
  }

  function _4() {
    c;
    return M.jM(eff(4), _5);
  }

  function _5() {
    return eff(6);
  }
}