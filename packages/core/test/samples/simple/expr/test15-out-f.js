import * as M from '@effectful/core';

function a() {
  var a;
  return M.chain(effb(2), _1);

  function _1(a) {
    return M.chain(eff(a), _2);
  }

  function _2(b) {
    a = b;
    return M.chain(effc(3), _3);
  }

  function _3(b) {
    5 + a + b;
  }
}