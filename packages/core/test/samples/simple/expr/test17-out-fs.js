import * as M from '@effectful/core';

function a() {
  return M.chain(effc(3), _1);

  function _1(a) {
    return M.chain(effb(2), _2, a);
  }

  function _2(b, a) {
    return M.chain(eff(b + 4), _3, a);
  }

  function _3(b, a) {
    5 + a + b;
  }
}