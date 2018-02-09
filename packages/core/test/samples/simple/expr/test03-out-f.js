function a() {
  return M.chainBH(eff(3), _1, _2);

  function _1(b) {
    var a;
    a = console.log(2 + b);
    1 + a + 4;
    return M.pure();
  }

  function _2(e) {
    return M.raise(e);
  }
}