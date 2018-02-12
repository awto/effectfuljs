import * as M from '@effectful/core';

function a() {
  var i;
  i = 0;
  return M.chain(eff1(i), _1, i);

  function _1(i) {
    i++;
    return M.chain(eff2(i), _2);
  }

  function _2() {}
}