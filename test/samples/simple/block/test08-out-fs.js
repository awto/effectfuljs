function a() {
  return M.jM(eff0(), _1);

  function _1() {
    var i;
    i = 0;
    i++;
    return M.jM1(eff1(i), _2, i);
  }

  function _2(i) {
    if (t) return _3(i);else {
      t;
      return _5(i);
    }
  }

  function _3(i) {
    return M.jM1(eff2(i), _4, i);
  }

  function _4(i) {
    i++;
    return M.jM1(eff4(i), _5, i);
  }

  function _5(i) {
    return M.jM1(eff5(i), _6, i);
  }

  function _6(i) {
    i++;
    return eff6(i);
  }
}