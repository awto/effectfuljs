import * as M from '@effectful/core';

function a() {
  return M.chainBH(eff1(), _1, _6);

  function _1() {
    return M.chainBH(eff2(), _2, _6);
  }

  function _2() {
    return M.chainBH(eff3(), _3, _6);
  }

  function _3() {
    return M.chainBH(eff(4), _4, _6);
  }

  function _4(a) {
    if (a) {
      return M.chainBH(eff(5), _5, _6);
    } else {
      return M.pure();
    }
  }

  function _5() {
    return M.pure();
  }

  function _6(e) {
    return M.raise(e);
  }
}