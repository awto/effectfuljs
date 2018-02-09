import * as M from '@effectful/core';

function a() {
  var i;
  i = 0;
  return M.chainBH(read1(), _1, _4);

  function _1(a) {
    i = a;
    return M.chainBH(eff(i), _2, _4);
  }

  function _2() {
    return M.chainBH(write(i), _3, _4);
  }

  function _3() {
    return M.pure();
  }

  function _4(e) {
    return M.raise(e);
  }
}