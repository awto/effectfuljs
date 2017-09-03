function a() {
  return M.jB(test(1), _1);

  function _1(a) {
    if (a) return _2();else {
      return M.j(eff(5), _3);
    }
  }

  function _2() {
    return M.j(eff(3), _3);
  }

  function _3() {
    return M.pure();
  }
}