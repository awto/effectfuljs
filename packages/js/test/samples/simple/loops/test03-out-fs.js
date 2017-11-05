function a() {
  var k;
  k = 0;
  return M.chain(eff1(), _1, _8, k);

  function _1(k) {
    return M.chain(eff2(), _2, _8, k);
  }

  function _2(a, k) {
    var i;
    i = a;
    return M.jump(_3, _8, k, i);
  }

  function _3(k, i, j) {
    if (i < 10) {
      k++;
      return M.chain(eff3(i), _4, _8, k, i);
    } else {
      return M.chain(eff6(i, j, k), _7, _8);
    }
  }

  function _4(a, k, i) {
    var j;
    j = a;
    return M.chain(eff4(i), _5, _8, k, i, j);
  }

  function _5(a, k, i, j) {
    var l, b;
    l = a;
    l++;
    b = j++;
    return M.chain(eff5(b, k, l), _6, _8, k, i, j);
  }

  function _6(k, i, j) {
    i++;
    return M.repeat(_3, _8, k, i, j);
  }

  function _7() {
    return M.pure();
  }

  function _8(e) {
    return M.raise(e);
  }
}