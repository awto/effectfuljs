function a() {
  var k;
  k = 0;
  return M.chainBH(eff1(), _1, _8, k);

  function _1(k) {
    return M.chainBH(eff2(), _2, _8, k);
  }

  function _2(a, k) {
    var i;
    i = a;
    return M.jumpH(_3, _8, k, i);
  }

  function _3(k, i, j) {
    if (i < 10) {
      k++;
      return M.chainBH(eff3(i), _4, _8, k, i);
    } else {
      return M.chainBH(eff6(i, j, k), _7, _8);
    }
  }

  function _4(a, k, i) {
    var j;
    j = a;
    return M.chainBH(eff4(i), _5, _8, k, i, j);
  }

  function _5(a, k, i, j) {
    var l, b;
    l = a;
    l++;
    b = j++;
    return M.chainBH(eff5(b, k, l), _6, _8, k, i, j);
  }

  function _6(k, i, j) {
    i++;
    return M.jumpRH(_3, _8, k, i, j);
  }

  function _7() {
    return M.pure();
  }

  function _8(e) {
    return M.raise(e);
  }
}