import * as M from '@effectful/core';

function a() {
  return M.chainBH(eff1(1), _1, _6);

  function _1() {
    a;
    return M.chainBH(test(1), _2, _6);
  }

  function _2(a) {
    if (a) {
      b;
      return M.chainBH(eff(3), _3, _6);
    } else {
      return M.chainBH(eff(5), _4, _6);
    }
  }

  function _3() {
    c;
    return M.chainBH(eff(4), _4, _6);
  }

  function _4() {
    return M.chainBH(eff(6), _5, _6);
  }

  function _5() {
    return M.pure();
  }

  function _6(e) {
    return M.raise(e);
  }
}