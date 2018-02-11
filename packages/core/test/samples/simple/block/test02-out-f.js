import * as M from '@effectful/core';

function a() {
  var i, a;
  a = i++;
  return M.chain(eff1(a), _1, _2);

  function _1() {
    return M.pure();
  }

  function _2(e) {
    return M.raise(e);
  }
}