function a() {
  return M.jMB(eff(1), _1);

  function _1(b) {
    const a = console.log(b, 2);
    return M.jMB(eff(2), _2);
  }

  function _2(b) {
    var a;
    a + b * 2;
    return M.pure();
  }
}