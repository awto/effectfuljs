import * as M from '@effectful/core';

function a() {
  return M.jump(void 0, _1, _8);

  function _1() {
    return M.chain(eff('in body'), _2, _8);
  }

  function _2(a) {
    if (a) {
      return M.jump(void 0, _3, _6, _5, _6);
    } else {
      return M.jump(void 0, _3, _6, _4, _6);
    }
  }

  function _3(fc, fe, err) {
    return M.chain(eff('in `finally`'), fc, fe, err);
  }

  function _4() {
    return M.chain(eff('after `finally`'), _5, _6);
  }

  function _5() {
    return M.pure();
  }

  function _6(e) {
    return M.raise(e);
  }

  function _7(err) {
    return M.raise(err);
  }

  function _8(a) {
    return M.jump(void 0, _3, _6, _7, _6, a);
  }
}