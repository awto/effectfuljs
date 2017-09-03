(function () {
  return _1();

  function _1() {
    return M.jB(eff(1), _2);
  }

  function _2(a) {
    if (a) return _1();else {
      return M.jB(eff(2), _3);
    }
  }

  function _3(a) {
    if (a) return _6();else {
      return M.j(eff(3), _4);
    }
  }

  function _4() {
    return M.jB(eff(4), _5);
  }

  function _5(a) {
    if (!a) return _6();else return _1();
  }

  function _6() {
    return M.j(eff(5), _7);
  }

  function _7() {
    return M.pure();
  }
});