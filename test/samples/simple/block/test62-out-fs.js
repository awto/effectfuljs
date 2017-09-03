function a(i) {
  var k;
  k = 0;
  return M.j(eff(i), _1, i, k);

  function _1(i, k) {
    var j, a, b;
    a = i++;
    b = j = 1;
    return M.j(eff(a, b), _2, i, j, k);
  }

  function _2(i, j, k) {
    var a, b;
    a = j++;
    b = k++;
    return M.j(eff(a, b), _3, i);
  }

  function _3(i) {
    return M.j(eff(i), _4, i);
  }

  function _4(i) {
    var j, a;
    a = j = 3;
    return M.j(eff(a), _5, i, j);
  }

  function _5(i, j) {
    return M.j(eff(j), _6, i);
  }

  function _6(i) {
    return M.j(eff(i), _7);
  }

  function _7() {
    return M.pure();
  }
}