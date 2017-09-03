// *- should inject forPar
function a() {
  return M.j(eff1(), _1);

  function _1() {
    return M.jB(eff2(), _2);
  }

  function _2(i) {
    return _3(i);
  }

  function _3(i) {
    if (i < 10) return _4(i);else {
      return M.jB(eff7(i), _7);
    }
  }

  function _4(i) {
    return M.jB(eff3(i), _5, i);
  }

  function _5(j, i) {
    var a;
    a = j++;
    return M.j(eff4(a), _6, i);
  }

  function _6(i) {
    i++;
    return M.jR(_3, i);
  }

  function _7(a) {
    console.log(a);
    return M.pure();
  }
}