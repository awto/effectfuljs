function a() {
  var i;
  return M.chain(eff1(), _1, _9);

  function _1() {
    return M.chain(eff2(), _2, _9);
  }

  function _2(a) {
    i = a;
    return M.jump(_3, _9);
  }

  function _3() {
    return M.chain(eff(3), _4, _9);
  }

  function _4(a) {
    if (i !== a) {
      return M.chain(eff5(i), _5, _9);
    } else {
      return M.chain(eff7(i), _8, _9);
    }
  }

  function _5() {
    return M.chain(eff6(i), _6, _9);
  }

  function _6() {
    return M.chain(eff4(i), _7, _9);
  }

  function _7(a) {
    i = a;
    return M.repeat(_3, _9);
  }

  function _8() {
    return M.pure();
  }

  function _9(e) {
    return M.raise(e);
  }
}