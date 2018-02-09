import * as M from '@effectful/core';

function a() {
  return M.chainBH(eff(1), _1, _6);

  function _1(a) {
    return M.chainBH(eff(2), _2, _6, a);
  }

  function _2(b, a) {
    return M.chainBH(eff(3), _3, _6, a, b);
  }

  function _3(c, a, b) {
    return M.chainBH(b(c), _4, _6, a);
  }

  function _4(b, a) {
    return M.chainBH(a(b), _5, _6);
  }

  function _5() {
    return M.pure();
  }

  function _6(e) {
    return M.raise(e);
  }
}