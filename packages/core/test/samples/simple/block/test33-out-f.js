import * as M from '@effectful/core';

function a() {
  return M.chain(eff(1), _1, _5);

  function _1() {
    return M.chain(eff(2), _2, _5);
  }

  function _2(a) {
    if (a) {
      return M.chain(eff3(), _3, _5);
    } else {
      b;
      return M.pure();
    }
  }

  function _3() {
    return M.chain(eff4(), _4, _5);
  }

  function _4() {
    return M.pure();
  }

  function _5(e) {
    return M.raise(e);
  }
}