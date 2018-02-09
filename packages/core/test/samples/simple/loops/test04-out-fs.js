import * as M from '@effectful/core';

function a() {
  return M.chainBH(eff1(), _1, _7);

  function _1() {
    return M.chainBH(eff2(), _2, _7);
  }

  function _2(a) {
    var i;
    i = a;
    return M.jumpH(_3, _7, i);
  }

  function _3(i) {
    var j;

    if (i < 10) {
      return M.chainBH(eff3(i, j), _4, _7, j, i);
    } else {
      return M.chainBH(eff7(i), _6, _7);
    }
  }

  function _4(j, i) {
    var a;
    a = j++;
    return M.chainBH(eff4(a), _5, _7, i);
  }

  function _5(i) {
    i++;
    return M.jumpRH(_3, _7, i);
  }

  function _6() {
    return M.pure();
  }

  function _7(e) {
    return M.raise(e);
  }
}