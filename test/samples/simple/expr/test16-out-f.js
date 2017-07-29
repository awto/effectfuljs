function a() {
  return M.jMB(eff(1), _1);

  function _1(a) {
    return M.jMB(eff(2), _2, a);
  }

  function _2(b, a) {
    return a(b + 2);
  }
}