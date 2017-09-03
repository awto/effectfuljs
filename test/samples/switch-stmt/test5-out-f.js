// *- without EOB exits
function b() {
  return M.jB(eff(1), _1);

  function _1(a) {
    switch (a) {
      case 1:
        return M.jB(effB(1), _2);

      case 2:
        return _3();

      default:
        return M.j(eff(4), _5);
    }
  }

  function _2(a) {
    if (a) return _5();else return _3();
  }

  function _3() {
    return M.jB(effB(2), _4);
  }

  function _4(a) {
    if (a) return _5();else {
      return M.j(effB(3), _5);
    }
  }

  function _5() {
    return M.pure();
  }
}