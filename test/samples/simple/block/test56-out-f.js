function a() {
  return M.j(eff1(1), _1);

  function _1() {
    a;
    return M.jB(test(1), _2);
  }

  function _2(a) {
    if (a) return _3();else {
      return M.j(eff(5), _5);
    }
  }

  function _3() {
    b;
    return M.j(eff(3), _4);
  }

  function _4() {
    c;
    return M.j(eff(4), _5);
  }

  function _5() {
    return M.j(eff(6), _6);
  }

  function _6() {
    return M.pure();
  }
}