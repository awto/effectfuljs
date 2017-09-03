// *- should inject forPar
function a() {
  var k, i, j, _k;

  return M.j(eff1(), _1);

  function _1() {
    return M.jB(eff2(), _2);
  }

  function _2(a) {
    i = a;
    return M.jB(eff3(), _3);
  }

  function _3(a) {
    j = a;
    return _4();
  }

  function _4() {
    if (i < 10 && j > -10) return _5();else {
      return M.j(eff5(i, j), _8);
    }
  }

  function _5() {
    return M.jB(eff3(i), _6);
  }

  function _6(a) {
    var b;
    _k = a;
    b = _k++;
    return M.j(eff4(b), _7);
  }

  function _7() {
    i++, j--;
    return M.jR(_4);
  }

  function _8() {
    return M.pure();
  }
}