function a() {
  var i;
  i = 0;
  return M.chainBH(eff2(2), _1, _3);

  function _1(a) {
    return M.chainBH(eff1(a), _2, _3);
  }

  function _2() {
    return M.pure();
  }

  function _3(e) {
    return M.raise(e);
  }
}