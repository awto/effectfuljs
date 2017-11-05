function a() {
  return M.chain(eff1(1), _1, _6);

  function _1() {
    a;
    return M.chain(test(1), _2, _6);
  }

  function _2(a) {
    if (a) {
      b;
      return M.chain(eff(3), _3, _6);
    } else {
      return M.chain(eff(5), _4, _6);
    }
  }

  function _3() {
    c;
    return M.chain(eff(4), _4, _6);
  }

  function _4() {
    return M.chain(eff(6), _5, _6);
  }

  function _5() {
    return M.pure();
  }

  function _6(e) {
    return M.raise(e);
  }
}