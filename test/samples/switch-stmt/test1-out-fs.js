function a() {
  return M.jB(eff(), _1);

  function _1(a) {
    return M.jB(effC(1), _2, a);
  }

  function _2(b, a) {
    return M.jB(effC(2), _3, a, b);
  }

  function _3(c, a, b) {
    switch (a) {
      case b:
        return M.j(effR(1), _4);

      case c:
        return _4();

      default:
        return _5();
    }
  }

  function _4() {
    return M.j(effR(2), _5);
  }

  function _5() {
    return M.j(effR('default'), _6);
  }

  function _6() {
    return M.pure();
  }
}