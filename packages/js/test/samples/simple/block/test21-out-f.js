function a() {
  var i, j, a, b;
  i = 0;
  j = 0;
  a = i++;
  b = j++;
  return M.chainBH(eff0(a, b), _1, _6);

  function _1() {
    return M.chainBH(eff1(i), _2, _6);
  }

  function _2() {
    i += 1;
    return M.chainBH(eff2(2, j), _3, _6);
  }

  function _3() {
    var a;
    a = i += 2;
    return M.chainBH(eff3(a, j), _4, _6);
  }

  function _4() {
    return M.chainBH(eff4(j), _5, _6);
  }

  function _5() {
    return M.pure();
  }

  function _6(e) {
    return M.raise(e);
  }
}