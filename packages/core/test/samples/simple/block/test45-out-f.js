import * as M from '@effectful/core';

function a() {
  var i, a;
  i = 0;
  a = i++;
  return M.chainBH(eff5(a), _1, _4);

  function _1() {
    var a;

    if (ee) {
      a = i++;
      return M.chainBH(eff7(a), _2, _4);
    } else {
      return M.jumpH(_2, _4);
    }
  }

  function _2() {
    return M.chainBH(eff8(i), _3, _4);
  }

  function _3() {
    return M.pure();
  }

  function _4(e) {
    return M.raise(e);
  }
}