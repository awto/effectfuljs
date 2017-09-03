// *- should inject forPar
function a() {
  var k;
  return M.j(eff1(), _1);

  function _1() {
    return M.jB(eff2(), _2);
  }

  function _2(i) {
    return M.jB(eff3(), _3, i);
  }

  function _3(j, i) {
    return _4(i, j);
  }

  function _4(i, j) {
    if (i < 10 && j > -10) return _5(i, j);else {
      return M.j(eff5(i, j), _8);
    }
  }

  function _5(i, j) {
    return M.jB(eff3(i), _6, i, j);
  }

  function _6(k, i, j) {
    var a;
    a = k++;
    return M.j(eff4(a), _7, i, j);
  }

  function _7(i, j) {
    i++, j--;
    return M.jR(_4, i, j);
  }

  function _8() {
    return M.pure();
  }
}