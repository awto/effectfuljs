function a() {
  return M.jB(eff(1), _1);

  function _1(a) {
    return M.jB(eff(2), _2, a);
  }

  function _2(b, a) {
    return M.j(a(b + 2), _3);
  }

  function _3() {
    return M.pure();
  }
}