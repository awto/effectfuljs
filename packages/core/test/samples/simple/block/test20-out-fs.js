import * as M from '@effectful/core';

function a() {
  var i;
  i = 0;
  return M.chain(eff0(i), _1, i);

  function _1(i) {
    i++;
    return M.chain(eff1(i), _2, i);
  }

  function _2(i) {
    return M.chain(eff1(i), _3, i);
  }

  function _3(i) {
    i++;
    return M.chain(eff1(i), _4);
  }

  function _4() {}
}