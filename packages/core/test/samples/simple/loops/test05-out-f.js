import * as M from '@effectful/core';

function a() {
  return M.chain(eff1(), _1);

  function _1() {
    return M.chain(eff2(), _2);
  }

  function _2() {
    return M.chain(eff(3), _3);
  }

  function _3(a) {
    if (a) {
      return M.chain(eff5(), _4);
    } else {
      return M.chain(eff7(), _6);
    }
  }

  function _4() {
    return M.chain(eff6(), _5);
  }

  function _5() {
    return M.chain(eff4(), _2);
  }

  function _6() {}
}