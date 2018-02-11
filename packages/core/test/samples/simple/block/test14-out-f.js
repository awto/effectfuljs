import * as M from '@effectful/core';

function a() {
  var i;
  i = 0;
  return M.chain(eff(i), _1, _4);

  function _1() {
    if (i++) {
      return M.chain(eff1(i), _2, _4);
    } else {
      return M.chain(eff2(i), _2, _4);
    }
  }

  function _2() {
    return M.chain(eff(i), _3, _4);
  }

  function _3() {
    return M.pure();
  }

  function _4(e) {
    return M.raise(e);
  }
}