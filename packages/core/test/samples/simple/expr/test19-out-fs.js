import * as M from '@effectful/core';

function a() {
  return M.chain(eff('1'), _1, _3);

  function _1(a) {
    return M.chain(eff(2), _2, _3, a);
  }

  function _2(b, a) {
    console.log(a, b, 3);
    return M.pure(console.log('4'));
  }

  function _3(e) {
    return M.raise(e);
  }
}