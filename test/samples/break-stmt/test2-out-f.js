// *- when it is the last statement
(function () {
  return M.jB(eff(2), _1);

  function _1(a) {
    if (a) return _2();else {
      return M.j(eff(3), _2);
    }
  }

  function _2() {
    return M.pure();
  }
});