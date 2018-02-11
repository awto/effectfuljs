import * as M from '@effectful/core';

function a() {
  var a, r;
  return M.chain(eff('1'), _1, _3);

  function _1(b) {
    a = b;
    return M.chain(eff(2), _2, _3);
  }

  function _2(b) {
    console.log(a, b, 3);
    return M.pure(console.log('4'));
  }

  function _3(e) {
    return M.raise(e);
  }
}