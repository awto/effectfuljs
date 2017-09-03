function a() {
  return M.j(eff1(1), _1);

  function _1() {
    a;
    if (test) return _2();else {
      return M.j(eff(5), _4);
    }
  }

  function _2() {
    b;
    return M.j(eff(3), _3);
  }

  function _3() {
    c;
    return M.j(eff(4), _4);
  }

  function _4() {
    return M.j(eff(6), _5);
  }

  function _5() {
    return M.pure();
  }
}