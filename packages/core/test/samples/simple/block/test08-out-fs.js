import * as M from '@effectful/core';

function a() {
  return M.chainBH(eff0(), _1, _7);

  function _1() {
    var i;
    i = 0;
    i++;
    return M.chainBH(eff1(i), _2, _7, i);
  }

  function _2(i) {
    if (t) {
      return M.chainBH(eff2(i), _3, _7, i);
    } else {
      t;
      return M.jumpH(_4, _7, i);
    }
  }

  function _3(i) {
    i++;
    return M.chainBH(eff4(i), _4, _7, i);
  }

  function _4(i) {
    return M.chainBH(eff5(i), _5, _7, i);
  }

  function _5(i) {
    i++;
    return M.chainBH(eff6(i), _6, _7);
  }

  function _6() {
    return M.pure();
  }

  function _7(e) {
    return M.raise(e);
  }
}