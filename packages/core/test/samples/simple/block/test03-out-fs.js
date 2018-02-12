import * as M from '@effectful/core';

function a() {
  return M.chain(eff0(), _1);

  function _1() {
    var i;
    i = 0;
    i++;
    return M.chain(eff1(i), _2, i);
  }

  function _2(i) {
    if (t) {
      return M.chain(eff2(i), _3);
    } else {
      return M.chain(eff3(i), _3);
    }
  }

  function _3() {}
}