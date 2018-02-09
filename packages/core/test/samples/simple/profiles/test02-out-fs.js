import * as M from '@effectful/core';

function e() {
  return M.chainBH(eff1(), _1, _3);

  function _1() {
    return M.chainBH(eff2(), _2, _3);
  }

  function _2() {
    return M.pure();
  }

  function _3(e) {
    return M.raise(e);
  }
}