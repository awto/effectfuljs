import * as M from '@effectful/core';

function a() {
  return M.chain(eff1(1), _1);

  function _1() {
    a;

    if (test) {
      b;
      return M.chain(eff(3), _2);
    } else {
      return M.chain(eff(5), _3);
    }
  }

  function _2() {
    c;
    return M.chain(eff(4), _3);
  }

  function _3() {
    return M.chain(eff(6), _4);
  }

  function _4() {}
}