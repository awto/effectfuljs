import * as M from '@effectful/core';

function a() {
  var i;
  i = 0;
  return M.chain(eff1(i), _1, _3);

  function _1() {
    i++;
    return M.chain(eff2(i), _2, _3);
  }

  function _2() {
    return M.pure();
  }

  function _3(e) {
    return M.raise(e);
  }
}