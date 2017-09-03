function a() {
  return M.jB(eff(1), _1);

  function _1(a) {
    switch (a) {
      case 1:
        return M.j(effB(1), _2);

      case 2:
        return _2();

      default:
        return M.j(effB(3), _3);
    }
  }

  function _2() {
    return M.j(effB(2), _3);
  }

  function _3() {
    return M.pure();
  }
}