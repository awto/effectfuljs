function a() {
  return M.chain(eff1(1), _1, _5);

  function _1() {
    a;

    if (test) {
      b;
      return M.chain(eff(3), _2, _5);
    } else {
      return M.chain(eff(5), _3, _5);
    }
  }

  function _2() {
    c;
    return M.chain(eff(4), _3, _5);
  }

  function _3() {
    return M.chain(eff(6), _4, _5);
  }

  function _4() {
    return M.pure();
  }

  function _5(e) {
    return M.raise(e);
  }
}