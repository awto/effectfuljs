import * as M from '@effectful/core';

function e() {
  return M.chain(eff(1), _1);

  function _1(a) {
    return M.chain(eff(2), _2, a);
  }

  function _2(b, a) {
    console.log(a + b);
  }
}