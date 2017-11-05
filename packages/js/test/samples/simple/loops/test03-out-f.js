function a() {
  var k, i, j, l;
  k = 0;
  return M.chain(eff1(), _1, _8);

  function _1() {
    return M.chain(eff2(), _2, _8);
  }

  function _2(a) {
    i = a;
    return M.jump(_3, _8);
  }

  function _3() {
    if (i < 10) {
      k++;
      return M.chain(eff3(i), _4, _8);
    } else {
      return M.chain(eff6(i, j, k), _7, _8);
    }
  }

  function _4(a) {
    j = a;
    return M.chain(eff4(i), _5, _8);
  }

  function _5(a) {
    var b;
    l = a;
    l++;
    b = j++;
    return M.chain(eff5(b, k, l), _6, _8);
  }

  function _6() {
    i++;
    return M.repeat(_3, _8);
  }

  function _7() {
    return M.pure();
  }

  function _8(e) {
    return M.raise(e);
  }
}