function a() {
  var a;
  return M.chainBH(eff(1), _1, _3);

  function _1(b) {
    a = b;
    return M.chainBH(eff(2), _2, _3);
  }

  function _2(b) {
    console.log(a, b, 2);
    return M.pure();
  }

  function _3(e) {
    return M.raise(e);
  }
}