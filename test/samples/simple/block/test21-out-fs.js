function a() {
  i = 0;
  j = 0;
  return M.jM2(eff0(i++, j++), _1, i, j);

  function _1(i, j) {
    return M.jM2(eff1(i), _2, i, j);
  }

  function _2(i, j) {
    i += 1;
    return M.jM2(eff2(2, j), _3, i, j);
  }

  function _3(i, j) {
    return M.jM1(eff3(i += 2, j), _4, j);
  }

  function _4(j) {
    return eff4(j);
  }
}