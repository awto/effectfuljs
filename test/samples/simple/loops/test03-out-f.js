function a() {
  var k, i, j, l;
  k = 0;
  return M.j(eff1(), _1);

  function _1() {
    return M.jB(eff2(), _2);
  }

  function _2(a) {
    i = a;
    return _3();
  }

  function _3() {
    if (i < 10) return _4();else {
      return M.j(eff6(i, j, k), _8);
    }
  }

  function _4() {
    k++;
    return M.jB(eff3(i), _5);
  }

  function _5(a) {
    j = a;
    return M.jB(eff4(i), _6);
  }

  function _6(a) {
    var b;
    l = a;
    l++;
    b = j++;
    return M.j(eff5(b, k, l), _7);
  }

  function _7() {
    i++;
    return M.jR(_3);
  }

  function _8() {
    return M.pure();
  }
}