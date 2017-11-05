function a() {
  return M.chain(eff(1), _1, _6);

  function _1(a) {
    return M.chain(eff(2), _2, _6, a);
  }

  function _2(b, a) {
    return M.chain(eff(3), _3, _6, a, b);
  }

  function _3(c, a, b) {
    return M.chain(b(c), _4, _6, a);
  }

  function _4(b, a) {
    return M.chain(a(b), _5, _6);
  }

  function _5() {
    return M.pure();
  }

  function _6(e) {
    return M.raise(e);
  }
}