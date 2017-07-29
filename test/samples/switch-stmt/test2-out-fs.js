function a() {
  return M.jMB(eff(1), _1);

  function _1(a) {
    return M.jMB(check(1), _2, a);
  }

  function _2(b, a) {
    return M.jMB(check(2), _3, a, b);
  }

  function _3(c, a, b) {
    switch (a) {
      case b:
        return effB(1);

      case c:
        return effB(2);

      default:
        return effB(3);
    }
  }
}