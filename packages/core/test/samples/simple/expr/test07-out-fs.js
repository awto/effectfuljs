import * as M from '@effectful/core';

function a() {
  return M.chain(eff(1), _1);

  function _1(b) {
    var a;
    a = console.log(b, 2);
    return M.chain(eff(2), _2, a);
  }

  function _2(b, a) {
    a + b * 2;
  }
}