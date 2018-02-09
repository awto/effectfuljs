import * as M from '@effectful/core';

function a() {
  var i;
  i = 0;
  return M.chainBH(eff0(i), _1, _5, i);

  function _1(i) {
    i++;
    return M.chainBH(eff1(i), _2, _5, i);
  }

  function _2(i) {
    return M.chainBH(eff1(i), _3, _5, i);
  }

  function _3(i) {
    i++;
    return M.chainBH(eff1(i), _4, _5);
  }

  function _4() {
    return M.pure();
  }

  function _5(e) {
    return M.raise(e);
  }
}