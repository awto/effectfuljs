import * as M from '@effectful/core';

function a() {
  return M.chain(eff(1), _1, _4);

  function _1(a) {
    switch (a) {
      case 1:
        return M.chain(effB(1), _2, _4);

      case 2:
        return M.jump(void 0, _2, _4);

      default:
        return M.chain(effB(3), _3, _4);
    }
  }

  function _2() {
    return M.chain(effB(2), _3, _4);
  }

  function _3() {
    return M.pure();
  }

  function _4(e) {
    return M.raise(e);
  }
}