function a() {
  return M.chainBH(effb(2), _1, _3);

  function _1(a) {
    return M.chainBH(eff(a), _2, _3);
  }

  function _2(a) {
    a + 2;
    return M.pure();
  }

  function _3(e) {
    return M.raise(e);
  }
}