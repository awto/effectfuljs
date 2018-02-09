function a() {
  var i, j;
  i = 0;
  j = 0;
  return M.chainBH(eff0(i, j), _1, _7);

  function _1() {
    var a, b;
    a = i++;
    b = j++;
    return M.chainBH(eff1(a, b), _2, _7);
  }

  function _2() {
    return M.chainBH(eff2(i), _3, _7);
  }

  function _3() {
    i += 1;
    return M.chainBH(eff3(2, j), _4, _7);
  }

  function _4() {
    var a;
    a = i += 2;
    return M.chainBH(eff4(a, j), _5, _7);
  }

  function _5() {
    return M.chainBH(eff5(j), _6, _7);
  }

  function _6() {
    return M.pure();
  }

  function _7(e) {
    return M.raise(e);
  }
}