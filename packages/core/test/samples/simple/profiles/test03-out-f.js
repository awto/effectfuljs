import * as M from '@effectful/core';

function a() {
  return M.chain(p1(), _1, _5);

  function _1() {
    return M.chain(p2(), _2, _5);
  }

  function _2() {
    return M.chain(e1(), _3, _5);
  }

  function _3() {
    return M.chain(e(2), _4, _5);
  }

  function _4() {
    return M.pure();
  }

  function _5(e) {
    return M.raise(e);
  }
}