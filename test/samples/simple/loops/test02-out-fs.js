// *- should inject forPar
function a() {
  var k;
  return M.jM(eff1(), _1);

  function _1() {
    return M.jMB(eff2(), _2);
  }

  function _2(i) {
    return M.jMB1(eff3(), _3, i);
  }

  function _3(j, i) {
    return _4(i, j);
  }

  function _4(i, j) {
    if (i < 10 && j > -10) return _5(i, j);else {
      return eff5(i, j);
    }
  }

  function _5(i, j) {
    return M.jMB2(eff3(i), _6, i, j);
  }

  function _6(k, i, j) {
    return M.jM2(eff4(k++), _7, i, j);
  }

  function _7(i, j) {
    i++, j--;
    return M.jR2(_4, i, j);
  }
}