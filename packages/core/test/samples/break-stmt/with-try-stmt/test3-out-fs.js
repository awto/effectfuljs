import * as M from '@effectful/core';

(function () {
  var e;
  return M.jumpH(_1, _6);

  function _1() {
    return M.chainBH(eff(2), _3, _5);
  }

  function _2(ex) {
    e = ex;
    return M.chainBH(eff(3), _3, _5);
  }

  function _3() {
    return M.chainBH(eff(4), _4, _5);
  }

  function _4() {
    return M.pure();
  }

  function _5(e) {
    return M.raise(e);
  }

  function _6(a) {
    return M.jumpH(_2, _5, a);
  }
});