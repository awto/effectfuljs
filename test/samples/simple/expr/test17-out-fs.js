function a() {
  return M.jMB(effc(3), _1);

  function _1(a) {
    return M.jMB(effb(2), _2, a);
  }

  function _2(b, a) {
    return M.jMB(eff(b + 4), _3, a);
  }

  function _3(b, a) {
    5 + a + b;
    return M.pure();
  }
}