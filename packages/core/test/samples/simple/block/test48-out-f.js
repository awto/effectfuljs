import * as M from '@effectful/core';

function a() {
  var i;
  i = 0;
  return M.chain(eff(1), _1, _2);

  function _1() {
    return M.pure();
  }

  function _2(e) {
    return M.raise(e);
  }
}