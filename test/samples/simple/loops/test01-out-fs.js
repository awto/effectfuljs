// *- should inject forPar
function a() {
  return M.jM(eff1(), _1);

  function _1() {
    return M.jMB(eff2(), _2);
  }

  function _2(i) {
    return _3(i);
  }

  function _3(i) {
    if (i < 10) return _4(i);else {
      return M.jMB(eff7(i), _7);
    }
  }

  function _4(i) {
    return M.jMB1(eff3(i), _5, i);
  }

  function _5(j, i) {
    return M.jM1(eff4(j++), _6, i);
  }

  function _6(i) {
    i++;
    return M.jR1(_3, i);
  }

  function _7(a) {
    console.log(a);
    return M.pure();
  }
}