function a() {
  return M.jMB(eff(1), _1);

  function _1(a) {
    switch (a) {
      case 1:
        return M.jM(effB(1), _2);

      case 2:
        return _2();

      default:
        return effB(3);
    }
  }

  function _2() {
    return effB(2);
  }
}