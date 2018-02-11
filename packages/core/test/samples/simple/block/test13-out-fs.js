import * as M from '@effectful/core';

function a() {
  var i;
  i = 0;

  if (t) {
    return M.chain(eff1(i), _1, _4, i);
  } else {
    i++;
    return M.jump(void 0, _1, _4, i);
  }

  function _1(i) {
    return M.chain(eff2(i), _2, _4, i);
  }

  function _2(i) {
    return M.chain(eff3(i), _3, _4);
  }

  function _3() {
    return M.pure();
  }

  function _4(e) {
    return M.raise(e);
  }
}