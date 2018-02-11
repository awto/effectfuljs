import * as M from '@effectful/core';

function a() {
  return M.chain(eff(1), _1, _3);

  function _1(a) {
    switch (a) {
      case 1:
        return M.chain(effB(1), _2, _3);

      case 2:
        return M.chain(effB(2), _2, _3);

      default:
        return M.chain(effB(3), _2, _3);
    }
  }

  function _2() {
    return M.pure();
  }

  function _3(e) {
    return M.raise(e);
  }
}