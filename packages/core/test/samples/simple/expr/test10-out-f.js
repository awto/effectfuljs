import * as M from '@effectful/core';

function a() {
  var a;
  return M.chainBH(eff(1), _1, _4);

  function _1(b) {
    a = b;
    return M.chainBH(eff(2), _2, _4);
  }

  function _2(b) {
    return M.chainBH(effC(a, b), _3, _4);
  }

  function _3() {
    return M.pure();
  }

  function _4(e) {
    return M.raise(e);
  }
}