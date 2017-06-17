function a() {
  return M.jM(eff1(), _1);

  function _1() {
    if (a1) return _2();else return _3();
  }

  function _2() {
    return M.jM(eff2(), _3);
  }

  function _3() {
    return M.jM(eff3(), _4);
  }

  function _4() {
    if (a2) return _5();else return _6();
  }

  function _5() {
    return M.jM(eff4(), _6);
  }

  function _6() {
    return M.jM(eff5(), _7);
  }

  function _7() {
    if (a3) {
      return M.jM(eff6(), _8);
    }
  }

  function _8() {
    return M.jM(eff7(), _9);
  }

  function _9() {
    if (a4) return _10();else return M.pure();
  }

  function _10() {
    return eff8();
  }
}