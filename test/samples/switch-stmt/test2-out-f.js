function a() {
  return M.jB(eff(1), _1);

  function _1(a) {
    return M.jB(check(1), _2, a);
  }

  function _2(b, a) {
    return M.jB(check(2), _3, a, b);
  }

  function _3(c, a, b) {
    switch (a) {
      case b:
        return M.j(effB(1), _4);

      case c:
        return M.j(effB(2), _4);

      default:
        return M.j(effB(3), _4);
    }
  }

  function _4() {
    return M.pure();
  }
}