import * as M from '@effectful/core';

function a() {
  var i;
  i = 0;
  return M.chainBH(eff(1), _1, _3);

  function _1() {
    i++;
    return M.chainBH(eff(2), _2, _3);
  }

  function _2() {
    return M.pure();
  }

  function _3(e) {
    return M.raise(e);
  }
}