function a() {
  return M.jB(eff(1), _1);

  function _1(a) {
    return M.jB(eff(2), _2, a);
  }

  function _2(b, a) {
    return M.jB(eff(3), _3, a, b);
  }

  function _3(c, a, b) {
    return M.j(a(b, c, 4), _4);
  }

  function _4() {
    return M.pure();
  }
}