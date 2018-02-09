import * as M from '@effectful/core';

// *- should inject forPar
function a() {
  return M.chainBH(eff1(), _1, _8);

  function _1() {
    return M.chainBH(eff2(), _2, _8);
  }

  function _2(a) {
    var i;
    i = a;
    return M.chainBH(eff3(), _3, _8, i);
  }

  function _3(a, i) {
    var j;
    j = a;
    return M.jumpH(_4, _8, i, j);
  }

  function _4(i, j) {
    if (i < 10 && j > -10) {
      return M.chainBH(eff3(i), _5, _8, i, j);
    } else {
      return M.chainBH(eff5(i, j), _7, _8);
    }
  }

  function _5(a, i, j) {
    var k, b;
    k = a;
    b = k++;
    return M.chainBH(eff4(b), _6, _8, i, j);
  }

  function _6(i, j) {
    i++, j--;
    return M.jumpRH(_4, _8, i, j);
  }

  function _7() {
    return M.pure();
  }

  function _8(e) {
    return M.raise(e);
  }
}