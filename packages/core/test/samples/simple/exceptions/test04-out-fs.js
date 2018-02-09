import * as M from '@effectful/core';

function a() {
  var e;
  return M.jumpH(_1, _5);

  function _1() {
    return M.chainBH(eff(1), _3, _4);
  }

  function _2(ex) {
    e = ex;
    console.log(e);
    return M.pure();
  }

  function _3() {
    return M.pure();
  }

  function _4(e) {
    return M.raise(e);
  }

  function _5(a) {
    return M.jumpH(_2, _4, a);
  }
}