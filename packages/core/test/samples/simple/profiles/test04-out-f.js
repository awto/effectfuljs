import * as M from '@effectful/core';

function a() {
  console.log('hi');
  return M.chain(e1(), _1);

  function _1() {
    return M.chain(e2(), _2);
  }

  function _2() {
    return M.chain(p1(), _3);
  }

  function _3() {
    console.profile('minimal');
    return M.chain(p2(), _4);
  }

  function _4() {
    console.profileEnd();
    return M.chain(e1(), _5);
  }

  function _5() {
    return M.chain(e(2), _6);
  }

  function _6() {}
}