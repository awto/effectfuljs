import * as M from '@effectful/core';

function a() {
  var e;
  return M.jump(void 0, _1, _4);

  function _1() {
    return M.chain(eff(1), _3);
  }

  function _2(ex) {
    e = ex;
    console.log(e);
  }

  function _3() {}

  function _4(a) {
    return M.jump(void 0, _2, a);
  }
}