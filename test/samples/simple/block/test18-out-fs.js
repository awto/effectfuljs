function a() {
  i = 0;
  return M.jM1(eff0(i++), _1, i);

  function _1(i) {
    return M.jM1(eff1(i), _2, i);
  }

  function _2(i) {
    i += 1;
    return M.jM1(eff2(2), _3, i);
  }

  function _3(i) {
    return eff3(i += 2);
  }
}