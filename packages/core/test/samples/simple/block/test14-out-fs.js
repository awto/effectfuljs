import * as M from '@effectful/core';

function a() {
  var i;
  i = 0;
  return M.chain(eff(i), _1, _4, i);

  function _1(i) {
    if (i++) {
      return M.chain(eff1(i), _2, _4, i);
    } else {
      return M.chain(eff2(i), _2, _4, i);
    }
  }

  function _2(i) {
    return M.chain(eff(i), _3, _4);
  }

  function _3() {
    return M.pure();
  }

  function _4(e) {
    return M.raise(e);
  }
}