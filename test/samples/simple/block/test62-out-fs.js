function a(i) {
  var k;
  k = 0;
  return M.jM2(eff(i), _1, i, k);

  function _1(i, k) {
    var j;
    return M.jM3(eff(i++, j = 1), _2, i, j, k);
  }

  function _2(i, j, k) {
    return M.jM1(eff(j++, k++), _3, i);
  }

  function _3(i) {
    return M.jM1(eff(i), _4, i);
  }

  function _4(i) {
    var j;
    return M.jM2(eff(j = 3), _5, i, j);
  }

  function _5(i, j) {
    return M.jM1(eff(j), _6, i);
  }

  function _6(i) {
    return eff(i);
  }
}