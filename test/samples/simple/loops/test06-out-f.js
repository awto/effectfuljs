function a() {
  var i;
  return M.j(eff1(), _1);

  function _1() {
    return M.jB(eff2(), _2);
  }

  function _2(a) {
    i = a;
    return _3();
  }

  function _3() {
    return M.jB(eff(3), _4);
  }

  function _4(a) {
    if (i !== a) return _5();else {
      return M.j(eff7(i), _9);
    }
  }

  function _5() {
    return M.j(eff5(i), _6);
  }

  function _6() {
    return M.j(eff6(i), _7);
  }

  function _7() {
    return M.jB(eff4(i), _8);
  }

  function _8(a) {
    i = a;
    return M.jR(_3);
  }

  function _9() {
    return M.pure();
  }
}