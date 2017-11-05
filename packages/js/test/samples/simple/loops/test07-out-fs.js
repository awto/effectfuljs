function a() {
  var i, j, k;
  i = 0;
  j = 0;
  k = 0;
  return M.chain(eff(i, j, k), _1, _4, i, j);

  function _1(i, j) {
    return M.chain(eff1(i), _2, _4, j);
  }

  function _2(j) {
    var k;
    k = 10;
    return M.chain(eff2(), _3, _4, j, k);
  }

  function _3(j, k) {
    return M.repeat(eff4(k, j), _3, _4, j, k);
  }

  function _4(e) {
    return M.raise(e);
  }
}