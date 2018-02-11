import * as M from '@effectful/core';

function a() {
  return M.chain(eff(1), _1, _2);

  function _1(a) {
    console.log(a, 2);
    return M.pure();
  }

  function _2(e) {
    return M.raise(e);
  }
}