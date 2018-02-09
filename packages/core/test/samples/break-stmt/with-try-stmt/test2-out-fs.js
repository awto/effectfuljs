import * as M from '@effectful/core';

// *- when it is the last statement
(function () {
  var e;
  return M.pure();

  function _1(ex) {
    e = ex;
    return M.chainBH(eff(3), _2, _3);
  }

  function _2() {
    return M.pure();
  }

  function _3(e) {
    return M.raise(e);
  }

  function _4(a) {
    return M.jumpH(_1, _3, a);
  }
});