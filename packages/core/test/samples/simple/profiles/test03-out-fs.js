import * as M from '@effectful/core';

function a() {
  return M.chainBH(p1(), _1, _5);

  function _1() {
    return M.chainBH(p2(), _2, _5);
  }

  function _2() {
    return M.chainBH(e1(), _3, _5);
  }

  function _3() {
    return M.chainBH(e(2), _4, _5);
  }

  function _4() {
    return M.pure();
  }

  function _5(e) {
    return M.raise(e);
  }
}