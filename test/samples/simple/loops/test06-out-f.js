function a() {
  var i;
  return M.jM(eff1(), _1);

  function _1() {
    return M.jMB(eff2(), _2);
  }

  function _2(a) {
    i = a;
    return _3();
  }

  function _3() {
    return M.jMB(eff(3), _4);
  }

  function _4(a) {
    if (i !== a) return _5();else {
      return eff7(i);
    }
  }

  function _5() {
    return M.jM(eff5(i), _6);
  }

  function _6() {
    return M.jM(eff6(i), _7);
  }

  function _7() {
    return M.jMB(eff4(i), _8);
  }

  function _8(a) {
    i = a;
    return M.jR(_3);
  }
}