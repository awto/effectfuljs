import * as M from '@effectful/core';

function a() {
  var i, a;
  a = i++;
  return M.chain(eff1(a), _1);

  function _1() {}
}