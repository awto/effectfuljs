function a() {
  var i, j;
  i = 0;
  j = 0;
  return M.jM(eff0(i, j), _1, i, j);

  function _1(i, j) {
    var a, b;
    a = i++;
    b = j++;
    return M.jM(eff1(a, b), _2, i, j);
  }

  function _2(i, j) {
    return M.jM(eff2(i), _3, i, j);
  }

  function _3(i, j) {
    i += 1;
    return M.jM(eff3(2, j), _4, i, j);
  }

  function _4(i, j) {
    var a;
    a = i += 2;
    return M.jM(eff4(a, j), _5, j);
  }

  function _5(j) {
    return eff5(j);
  }
}