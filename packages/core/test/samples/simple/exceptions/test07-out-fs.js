import * as M from '@effectful/core';

function a() {
  return M.jump(void 0, _1, _7);

  function _1() {
    return M.chain(eff(1), _2, _4, _5);
  }

  function _2(fc, fe, err) {
    console.log(1);
    return M.chain(eff(2), _3, fc, fe, err);
  }

  function _3(fc, fe, err) {
    console.log(2);
    return M.jump(void 0, fc, fe, err);
  }

  function _4() {}

  function _5(e) {
    return M.raise(e);
  }

  function _6(err) {
    return M.raise(err);
  }

  function _7(a) {
    return M.jump(void 0, _2, _6, _5, a);
  }
}