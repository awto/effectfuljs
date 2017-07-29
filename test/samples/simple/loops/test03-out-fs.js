function a() {
  var k;
  k = 0;
  return M.jM(eff1(), _1, k);

  function _1(k) {
    return M.jMB(eff2(), _2, k);
  }

  function _2(i, k) {
    return _3(k, i, undefined);
  }

  function _3(k, i, j) {
    if (i < 10) return _4(k, i);else {
      return eff6(i, j, k);
    }
  }

  function _4(k, i) {
    k++;
    return M.jMB(eff3(i), _5, k, i);
  }

  function _5(j, k, i) {
    return M.jMB(eff4(i), _6, k, i, j);
  }

  function _6(l, k, i, j) {
    var a;
    l++;
    a = j++;
    return M.jM(eff5(a, k, l), _7, k, i, j);
  }

  function _7(k, i, j) {
    i++;
    return M.jR(_3, k, i, j);
  }
}