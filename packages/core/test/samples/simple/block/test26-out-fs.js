function a() {
  var i, a;
  a = i++;
  return M.chainBH(eff1(a), _1, _5);

  function _1(a) {
    var i;
    i = a;
    return M.chainBH(eff2(i), _2, _5, i);
  }

  function _2(i) {
    var a;
    a = i++;
    return M.chainBH(eff3(a), _3, _5);
  }

  function _3(a) {
    var i;
    i = a;
    return M.chainBH(eff4(i), _4, _5);
  }

  function _4() {
    return M.pure();
  }

  function _5(e) {
    return M.raise(e);
  }
}