import * as M from '@effectful/core';

function a() {
  var a, b;
  return M.chainBH(eff(1), _1, _6);

  function _1(b) {
    a = b;
    return M.chainBH(eff(2), _2, _6);
  }

  function _2(a) {
    b = a;
    return M.chainBH(eff(3), _3, _6);
  }

  function _3(a) {
    return M.chainBH(b(a), _4, _6);
  }

  function _4(b) {
    return M.chainBH(a(b), _5, _6);
  }

  function _5() {
    return M.pure();
  }

  function _6(e) {
    return M.raise(e);
  }
}