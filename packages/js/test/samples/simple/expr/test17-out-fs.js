function a() {
  return M.chain(effc(3), _1, _4);

  function _1(a) {
    return M.chain(effb(2), _2, _4, a);
  }

  function _2(b, a) {
    return M.chain(eff(b + 4), _3, _4, a);
  }

  function _3(b, a) {
    5 + a + b;
    return M.pure();
  }

  function _4(e) {
    return M.raise(e);
  }
}