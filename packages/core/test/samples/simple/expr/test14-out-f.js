function a() {
  var a, b;
  return M.chainBH(eff(1), _1, _5);

  function _1(b) {
    a = b;
    return M.chainBH(eff(2), _2, _5);
  }

  function _2(a) {
    b = a;
    return M.chainBH(eff(3), _3, _5);
  }

  function _3(c) {
    return M.chainBH(a(b, c, 4), _4, _5);
  }

  function _4() {
    return M.pure();
  }

  function _5(e) {
    return M.raise(e);
  }
}