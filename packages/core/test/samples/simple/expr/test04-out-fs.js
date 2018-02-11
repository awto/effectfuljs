import * as M from '@effectful/core';

function e() {
  return M.chain(eff(1), _1, _3);

  function _1(a) {
    return M.chain(eff(2), _2, _3, a);
  }

  function _2(b, a) {
    console.log(a + b);
    return M.pure();
  }

  function _3(e) {
    return M.raise(e);
  }
}