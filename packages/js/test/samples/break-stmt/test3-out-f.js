(function () {
  return M.chainBH(eff(2), _1, _3);

  function _1() {
    return M.chainBH(eff(4), _2, _3);
  }

  function _2() {
    return M.pure();
  }

  function _3(e) {
    return M.raise(e);
  }
});