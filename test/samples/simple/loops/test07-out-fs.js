function a() {
  var i, j, k;
  i = 0;
  j = 0;
  k = 0;
  return M.j(eff(i, j, k), _1, i, j);

  function _1(i, j) {
    return M.j(eff1(i), _2, j);
  }

  function _2(j) {
    var k;
    k = 10;
    return M.j(eff2(), _3, j, k);
  }

  function _3(j, k) {
    return M.jR(eff4(k, j), _3, j, k);
  }

  function _4() {
    var i, j, k;
    i = 20, j = 30, k = 40;
    return M.jR(eff5(), _4);
  }

  function _5() {
    return M.pure();
  }
}