import * as M from '@effectful/core';

function a() {
  return M.chainBH(eff1(), _1, _7);

  function _1() {
    return M.chainBH(eff2(), _2, _7);
  }

  function _2() {
    return M.chainBH(eff(3), _3, _7);
  }

  function _3(a) {
    if (a) {
      return M.chainBH(eff5(), _4, _7);
    } else {
      return M.chainBH(eff7(), _6, _7);
    }
  }

  function _4() {
    return M.chainBH(eff6(), _5, _7);
  }

  function _5() {
    return M.chainBH(eff4(), _2, _7);
  }

  function _6() {
    return M.pure();
  }

  function _7(e) {
    return M.raise(e);
  }
}