function a() {
  return M.jB(eff(1), _1);

  function _1(a) {
    return M.jB(eff(2), _2, a);
  }

  function _2(b, a) {
    return M.jB(eff(3), _3, a, b);
  }

  function _3(c, a, b) {
    return M.jB(b(c), _4, a);
  }

  function _4(b, a) {
    return M.j(a(b), _5);
  }

  function _5() {
    return M.pure();
  }
}