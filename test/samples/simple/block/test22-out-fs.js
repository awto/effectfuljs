function a() {
  var i, j;
  i = 0;
  j = 0;
  return M.j(eff0(i, j), _1, i, j);

  function _1(i, j) {
    var a, b;
    a = i++;
    b = j++;
    return M.j(eff1(a, b), _2, i, j);
  }

  function _2(i, j) {
    return M.j(eff2(i), _3, i, j);
  }

  function _3(i, j) {
    i += 1;
    return M.j(eff3(2, j), _4, i, j);
  }

  function _4(i, j) {
    var a;
    a = i += 2;
    return M.j(eff4(a, j), _5, j);
  }

  function _5(j) {
    return M.j(eff5(j), _6);
  }

  function _6() {
    return M.pure();
  }
}