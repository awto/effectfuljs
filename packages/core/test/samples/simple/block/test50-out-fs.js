function a() {
  return M.chainBH(test(1), _1, _3);

  function _1(a) {
    if (a) {
      return M.chainBH(eff(3), _2, _3);
    } else {
      return M.chainBH(eff(5), _2, _3);
    }
  }

  function _2() {
    return M.pure();
  }

  function _3(e) {
    return M.raise(e);
  }
}