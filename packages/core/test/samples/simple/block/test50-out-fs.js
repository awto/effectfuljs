import * as M from '@effectful/core';

function a() {
  return M.chain(test(1), _1, _3);

  function _1(a) {
    if (a) {
      return M.chain(eff(3), _2, _3);
    } else {
      return M.chain(eff(5), _2, _3);
    }
  }

  function _2() {
    return M.pure();
  }

  function _3(e) {
    return M.raise(e);
  }
}