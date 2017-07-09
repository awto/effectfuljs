function a() {
  var i, j, k;
  i = 0;
  j = 0;
  k = 0;
  return M.jM(eff(i, j, k), _1);

  function _1() {
    return M.jM(eff1(i), _2);
  }

  function _2() {
    k = 10;
    return M.jM(eff2(), _3);
  }

  function _3() {
    return M.jRM(eff4(k, j), _3);
  }

  function _4() {
    i = 20, j = 30, k = 40;
    return M.jRM(eff5(), _4);
  }
}