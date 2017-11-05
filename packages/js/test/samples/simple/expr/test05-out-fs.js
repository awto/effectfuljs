function a() {
  return M.chain(effb(2), _1, _3);

  function _1(a) {
    return M.chain(eff(a), _2, _3);
  }

  function _2(a) {
    a + 2;
    return M.pure();
  }

  function _3(e) {
    return M.raise(e);
  }
}