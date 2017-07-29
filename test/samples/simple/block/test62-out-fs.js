function a(i) {
  var k;
  k = 0;
  return M.jM(eff(i), _1, i, k);

  function _1(i, k) {
    var j, a, b;
    a = i++;
    b = j = 1;
    return M.jM(eff(a, b), _2, i, j, k);
  }

  function _2(i, j, k) {
    var a, b;
    a = j++;
    b = k++;
    return M.jM(eff(a, b), _3, i);
  }

  function _3(i) {
    return M.jM(eff(i), _4, i);
  }

  function _4(i) {
    var j, a;
    a = j = 3;
    return M.jM(eff(a), _5, i, j);
  }

  function _5(i, j) {
    return M.jM(eff(j), _6, i);
  }

  function _6(i) {
    return eff(i);
  }
}