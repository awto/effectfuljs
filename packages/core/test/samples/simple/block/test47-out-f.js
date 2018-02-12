import * as M from '@effectful/core';

function a() {
  var i;
  i = 0;
  return M.chain(eff(1), _1);

  function _1() {
    i++;
    return M.chain(eff(2), _2);
  }

  function _2() {}
}