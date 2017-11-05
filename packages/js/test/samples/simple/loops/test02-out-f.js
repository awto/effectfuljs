// *- should inject forPar
function a() {
  var k, i, j;
  return M.chain(eff1(), _1, _8);

  function _1() {
    return M.chain(eff2(), _2, _8);
  }

  function _2(a) {
    i = a;
    return M.chain(eff3(), _3, _8);
  }

  function _3(a) {
    j = a;
    return M.jump(_4, _8);
  }

  function _4() {
    if (i < 10 && j > -10) {
      return M.chain(eff3(i), _5, _8);
    } else {
      return M.chain(eff5(i, j), _7, _8);
    }
  }

  function _5(a) {
    var b;
    k = a;
    b = k++;
    return M.chain(eff4(b), _6, _8);
  }

  function _6() {
    i++, j--;
    return M.repeat(_4, _8);
  }

  function _7() {
    return M.pure();
  }

  function _8(e) {
    return M.raise(e);
  }
}