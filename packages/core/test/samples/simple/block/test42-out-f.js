import * as M from '@effectful/core';

function a() {
  return M.chain(eff1(), _1);

  function _1() {
    return M.chain(eff2(), _2);
  }

  function _2() {
    return M.chain(eff3(), _3);
  }

  function _3() {
    return M.chain(eff(4), _4);
  }

  function _4(a) {
    if (a) {
      return M.chain(eff(5), _5);
    } else return;
  }

  function _5() {}
}