function a() {
  var i, j, k;
  i = 0;
  j = 0;
  k = 0;
  return M.j(eff(i, j, k), _1);

  function _1() {
    return M.j(eff1(i), _2);
  }

  function _2() {
    k = 10;
    return M.j(eff2(), _3);
  }

  function _3() {
    return M.jR(eff4(k, j), _3);
  }

  function _4() {
    i = 20, j = 30, k = 40;
    return M.jR(eff5(), _4);
  }

  function _5() {
    return M.pure();
  }
}