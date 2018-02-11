import * as M from '@effectful/core';

function e() {
  var a;
  return M.chain(eff(1), _1, _3);

  function _1(b) {
    a = b;
    return M.chain(eff(2), _2, _3);
  }

  function _2(b) {
    console.log(a + b);
    return M.pure();
  }

  function _3(e) {
    return M.raise(e);
  }
}