function a() {
  var i, a, b;

  if (ee) {
    a = i++;
    return M.chainBH(eff1(a), _1, _4);
  } else {
    b = i++;
    return M.chainBH(eff1(b), _2, _4);
  }

  function _1() {
    var a;
    a = i++;
    return M.chainBH(eff2(a), _3, _4);
  }

  function _2() {
    var a;
    a = i++;
    return M.chainBH(eff2(a), _3, _4);
  }

  function _3() {
    return M.pure();
  }

  function _4(e) {
    return M.raise(e);
  }
}