import * as M from '@effectful/core';

// *- when it is the last statement
(function () {
  return M.chain(eff(2), _1, _3);

  function _1(a) {
    if (a) {
      return M.pure();
    } else {
      return M.chain(eff(3), _2, _3);
    }
  }

  function _2() {
    return M.pure();
  }

  function _3(e) {
    return M.raise(e);
  }
});