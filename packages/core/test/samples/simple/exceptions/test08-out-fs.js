import * as M from '@effectful/core';

function a() {
  return M.jump(void 0, _1, _6);

  function _1() {
    return M.chain(eff(1), _2, _3, _4);
  }

  function _2(fc, fe, err) {
    console.log('fin');
    return M.jump(void 0, fc, fe, err);
  }

  function _3() {}

  function _4(e) {
    return M.raise(e);
  }

  function _5(err) {
    return M.raise(err);
  }

  function _6(a) {
    return M.jump(void 0, _2, _5, _4, a);
  }
}