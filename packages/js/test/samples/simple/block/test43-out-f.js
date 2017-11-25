function a() {
  var r;
  return M.chainBH(eff1(), _1, _3);

  function _1() {
    if (a) {
      return M.pure(5);
    } else {
      return M.chainBH(eff6(), _2, _3);
    }
  }

  function _2() {
    return M.pure(r);
  }

  function _3(e) {
    return M.raise(e);
  }
}