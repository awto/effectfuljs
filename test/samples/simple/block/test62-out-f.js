function a(i) {
  var j, k;
  k = 0;
  return M.jM(eff(i), _1);

  function _1() {
    return M.jM(eff(i++, j = 1), _2);
  }

  function _2() {
    return M.jM(eff(j++, k++), _3);
  }

  function _3() {
    return M.jM(eff(i), _4);
  }

  function _4() {
    return M.jM(eff(j = 3), _5);
  }

  function _5() {
    return M.jM(eff(j), _6);
  }

  function _6() {
    return eff(i);
  }
}