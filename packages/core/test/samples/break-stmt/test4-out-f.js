import * as M from '@effectful/core';

(function () {
  return M.chainBH(eff(1), _1, _4);

  function _1() {
    return M.chainBH(eff(3), _2, _4);
  }

  function _2() {
    return M.chainBH(eff(4), _3, _4);
  }

  function _3() {
    return M.pure();
  }

  function _4(e) {
    return M.raise(e);
  }
});