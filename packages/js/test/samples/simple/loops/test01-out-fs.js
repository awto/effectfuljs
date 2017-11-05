// *- should inject forPar
function a() {
  return M.chain(eff1(), _1, _7);

  function _1() {
    return M.chain(eff2(), _2, _7);
  }

  function _2(a) {
    var i;
    i = a;
    return M.jump(_3, _7, i);
  }

  function _3(i) {
    if (i < 10) {
      return M.chain(eff3(i), _4, _7, i);
    } else {
      return M.chain(eff7(i), _6, _7);
    }
  }

  function _4(a, i) {
    var j, b;
    j = a;
    b = j++;
    return M.chain(eff4(b), _5, _7, i);
  }

  function _5(i) {
    i++;
    return M.repeat(_3, _7, i);
  }

  function _6(a) {
    console.log(a);
    return M.pure();
  }

  function _7(e) {
    return M.raise(e);
  }
}