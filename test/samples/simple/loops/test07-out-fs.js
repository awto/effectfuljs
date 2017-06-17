function a() {
  i = 0;
  j = 0;
  k = 0;
  return M.jM2(eff(i, j, k), _1, i, j);

  function _1(i, j) {
    return M.jM1(eff1(i), _2, j);
  }

  function _2(j) {
    var k;
    k = 10;
    return M.jM2(eff2(), _3, j, k);
  }

  function _3(j, k) {
    return M.jM2R(eff4(k, j), _3, j, k);
  }

  function _4() {
    var i, j, k;
    i = 20, j = 30, k = 40;
    return M.jMR(eff5(), _4);
  }
}