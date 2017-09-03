// *- should inject forPar
function a() {
  var i, j;
  return M.j(eff1(), _1);

  function _1() {
    return M.jB(eff2(), _2);
  }

  function _2(a) {
    i = a;
    return _3();
  }

  function _3() {
    if (i < 10) return _4();else {
      return M.jB(eff7(i), _7);
    }
  }

  function _4() {
    return M.jB(eff3(i), _5);
  }

  function _5(a) {
    var b;
    j = a;
    b = j++;
    return M.j(eff4(b), _6);
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