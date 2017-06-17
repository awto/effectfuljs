// *- without EOB exits
function b() {
  return M.jMB(eff(1), _1);

  function _1(a) {
    switch (a) {
      case 1:
        return M.jMB(effB(1), _2);

      case 2:
        return _3();

      default:
        return eff(4);
    }
  }

  function _2(a) {
    if (a) return M.pure();else return _3();
  }

  function _3() {
    return M.jMB(effB(2), _4);
  }

  function _4(a) {
    if (a) return M.pure();else {
      return effB(3);
    }
  }
}