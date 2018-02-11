import * as M from '@effectful/core';

// *- when it is the last statement
(function () {
  var e;
  return M.pure();

  function _1(ex) {
    e = ex;
    return M.chain(eff(3), _2, _3);
  }

  function _2() {
    return M.pure();
  }

  function _3(e) {
    return M.raise(e);
  }

  function _4(a) {
    return M.jump(void 0, _1, _3, a);
  }
});