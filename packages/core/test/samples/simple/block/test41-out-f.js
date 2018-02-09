import * as M from '@effectful/core';

function a() {
  return M.chainBH(eff1(), _1, _9);

  function _1() {
    if (a1) {
      return M.chainBH(eff2(), _2, _9);
    } else {
      return M.jumpH(_2, _9);
    }
  }

  function _2() {
    return M.chainBH(eff3(), _3, _9);
  }

  function _3() {
    if (a2) {
      return M.chainBH(eff4(), _4, _9);
    } else {
      return M.jumpH(_4, _9);
    }
  }

  function _4() {
    return M.chainBH(eff5(), _5, _9);
  }

  function _5() {
    if (a3) {
      return M.chainBH(eff6(), _6, _9);
    } else {
      return M.jumpH(_6, _9);
    }
  }

  function _6() {
    return M.chainBH(eff7(), _7, _9);
  }

  function _7() {
    if (a4) {
      return M.chainBH(eff8(), _8, _9);
    } else {
      return M.pure();
    }
  }

  function _8() {
    return M.pure();
  }

  function _9(e) {
    return M.raise(e);
  }
}