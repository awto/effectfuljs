import * as M from '@effectful/core';

function a() {
  return M.chain(test(1), _1);

  function _1(a) {
    if (a) {
      return M.chain(eff(3), _2);
    } else {
      return M.chain(eff(5), _2);
    }
  }

  function _2() {}
}