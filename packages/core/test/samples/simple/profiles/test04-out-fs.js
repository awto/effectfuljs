import * as M from '@effectful/core';

function a() {
  console.log('hi');
  return M.chain(e1(), _1, _7);

  function _1() {
    return M.chain(e2(), _2, _7);
  }

  function _2() {
    return M.chain(p1(), _3, _7);
  }

  function _3() {
    console.profile('minimal');
    return M.chain(p2(), _4, _7);
  }

  function _4() {
    console.profileEnd();
    return M.chain(e1(), _5, _7);
  }

  function _5() {
    return M.chain(e(2), _6, _7);
  }

  function _6() {
    return M.pure();
  }

  function _7(e) {
    return M.raise(e);
  }
}