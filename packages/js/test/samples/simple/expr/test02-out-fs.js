function M() {
  return M.chainBH(eff(2), _1, _2);

  function _1() {
    return M.pure();
  }

  function _2(e) {
    return M.raise(e);
  }
}