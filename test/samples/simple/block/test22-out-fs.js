function a() {
  var i, j;
  i = 0;
  j = 0;
  return M.jM2(eff0(i, j), _1, i, j);

  function _1(i, j) {
    return M.jM2(eff1(i++, j++), _2, i, j);
  }

  function _2(i, j) {
    return M.jM2(eff2(i), _3, i, j);
  }

  function _3(i, j) {
    i += 1;
    return M.jM2(eff3(2, j), _4, i, j);
  }

  function _4(i, j) {
    return M.jM1(eff4(i += 2, j), _5, j);
  }

  function _5(j) {
    return eff5(j);
  }
}