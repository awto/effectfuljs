function a() {
  var a;
  return M.chain(eff(1), _1, _4);

  function _1(b) {
    a = b;
    return M.chain(eff(2), _2, _4);
  }

  function _2(b) {
    return M.chain(a(b + 2), _3, _4);
  }

  function _3() {
    return M.pure();
  }

  function _4(e) {
    return M.raise(e);
  }
}