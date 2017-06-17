(function () {
  return _1();

  function _1() {
    return M.jMB(eff(1), _2);
  }

  function _2(a) {
    if (a) return _1();else {
      return M.jMB(eff(2), _3);
    }
  }

  function _3(a) {
    if (a) return _6();else {
      return M.jM(eff(3), _4);
    }
  }

  function _4() {
    return M.jMB(eff(4), _5);
  }

  function _5(a) {
    if (!a) return _6();else return _1();
  }

  function _6() {
    return eff(5);
  }
});