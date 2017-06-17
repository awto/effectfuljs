function a() {
  return M.jMB(test(1), _1);

  function _1(a) {
    if (a) return _2();else {
      return eff(5);
    }
  }

  function _2() {
    return eff(3);
  }
}