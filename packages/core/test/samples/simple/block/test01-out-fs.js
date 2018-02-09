function a() {
  var j;
  j = 0;
  return M.chainBH(eff(j), _1, _5, j);

  function _1(j) {
    var a;
    a = j++;
    return M.chainBH(eff(a), _2, _5, j);
  }

  function _2(j) {
    return M.chainBH(eff2(j), _3, _5, j);
  }

  function _3(j) {
    var a;
    a = j++;
    return M.chainBH(eff3(a), _4, _5);
  }

  function _4() {
    return M.pure();
  }

  function _5(e) {
    return M.raise(e);
  }
}