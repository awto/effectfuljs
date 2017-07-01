// *- should inject forPar
function a() {
  var i, j;
  return M.jM(eff1(), _1);

  function _1() {
    return M.jMB(eff2(), _2);
  }

  function _2(a) {
    i = a;
    return _3();
  }

  function _3() {
    if (i < 10) return _4();else {
      return M.jMB(eff7(i), _7);
    }
  }

  function _4() {
    return M.jMB(eff3(i), _5);
  }

  function _5(a) {
    j = a;
    return M.jM(eff4(j++), _6);
  }

  function _6() {
    i++;
    return M.jR(_3);
  }

  function _7(a) {
    console.log(a);
    return M.pure();
  }
}