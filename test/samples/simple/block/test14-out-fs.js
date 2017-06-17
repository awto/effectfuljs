function a() {
  i = 0;
  return M.jM1(eff(i), _1, i);

  function _1(i) {
    if (i++) return _2(i);else {
      return M.jM1(eff2(i), _3, i);
    }
  }

  function _2(i) {
    return M.jM1(eff1(i), _3, i);
  }

  function _3(i) {
    return eff(i);
  }
}