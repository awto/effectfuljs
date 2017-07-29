function a() {
  return M.jMB(eff(), _1);

  function _1(a) {
    return M.jMB(effC(1), _2, a);
  }

  function _2(b, a) {
    return M.jMB(effC(2), _3, a, b);
  }

  function _3(c, a, b) {
    switch (a) {
      case b:
        return M.jM(effR(1), _4);

      case c:
        return _4();

      default:
        return _5();
    }
  }

  function _4() {
    return M.jM(effR(2), _5);
  }

  function _5() {
    return effR('default');
  }
}