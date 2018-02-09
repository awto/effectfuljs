import * as M from '@effectful/core';

function a() {
  return M.chainBH(eff0(), _1, _4);

  function _1() {
    var i;
    i = 0;
    i++;
    return M.chainBH(eff1(i), _2, _4, i);
  }

  function _2(i) {
    if (t) {
      return M.chainBH(eff2(i), _3, _4);
    } else {
      return M.chainBH(eff3(i), _3, _4);
    }
  }

  function _3() {
    return M.pure();
  }

  function _4(e) {
    return M.raise(e);
  }
}