function a() {
  var i, j, a, b;
  i = 0;
  j = 0;
  a = i++;
  b = j++;
  return M.jM(eff0(a, b), _1, i, j);

  function _1(i, j) {
    return M.jM(eff1(i), _2, i, j);
  }

  function _2(i, j) {
    i += 1;
    return M.jM(eff2(2, j), _3, i, j);
  }

  function _3(i, j) {
    var a;
    a = i += 2;
    return M.jM(eff3(a, j), _4, j);
  }

  function _4(j) {
    return eff4(j);
  }
}