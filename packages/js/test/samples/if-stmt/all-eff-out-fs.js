function a() {
  return M.chainBH(eff(1), _1, _3);

  function _1(a) {
    if (a) {
      return M.chainBH(eff(2), _2, _3);
    } else {
      return M.chainBH(eff(3), _2, _3);
    }
  }

  function _2(r) {
    return M.pure(r);
  }

  function _3(e) {
    return M.raise(e);
  }
}