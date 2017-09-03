function a() {
  return M.jB(eff(1), _1);

  function _1(a) {
    return M.jB(eff(2), _2, a);
  }

  function _2(b, a) {
    console.log(a, b, 2);
    return M.pure();
  }
}