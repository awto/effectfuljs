function a() {
  var a, b;
  return M.chain(eff(1), _1, _6);

  function _1(b) {
    a = b;
    return M.chain(eff(2), _2, _6);
  }

  function _2(a) {
    b = a;
    return M.chain(eff(3), _3, _6);
  }

  function _3(a) {
    return M.chain(b(a), _4, _6);
  }

  function _4(b) {
    return M.chain(a(b), _5, _6);
  }

  function _5() {
    return M.pure();
  }

  function _6(e) {
    return M.raise(e);
  }
}