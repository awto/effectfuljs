function a() {
  var a;
  return M.chain(eff(1), _1, _3);

  function _1(b) {
    a = console.log(b, 2);
    return M.chain(eff(2), _2, _3);
  }

  function _2(b) {
    a + b * 2;
    return M.pure();
  }

  function _3(e) {
    return M.raise(e);
  }
}