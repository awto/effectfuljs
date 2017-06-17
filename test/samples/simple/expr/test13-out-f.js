function a() {
  return M.jMB(eff(1), _1);

  function _1(a) {
    return M.jMB1(eff(2), _2, a);
  }

  function _2(b, a) {
    return M.jMB2(eff(3), _3, a, b);
  }

  function _3(c, a, b) {
    return M.jMB1(b(c), _4, a);
  }

  function _4(b, a) {
    return a(b);
  }
}