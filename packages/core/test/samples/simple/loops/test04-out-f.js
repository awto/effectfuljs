import * as M from '@effectful/core';

function a() {
  var j, i;
  return M.chain(eff1(), _1, _7);

  function _1() {
    return M.chain(eff2(), _2, _7);
  }

  function _2(a) {
    i = a;
    return M.jump(void 0, _3, _7);
  }

  function _3() {
    if (i < 10) {
      return M.chain(eff3(i, j), _4, _7);
    } else {
      return M.chain(eff7(i), _6, _7);
    }
  }

  function _4() {
    var a;
    a = j++;
    return M.chain(eff4(a), _5, _7);
  }

  function _5() {
    i++;
    return M.jump(void 0, _3, _7);
  }

  function _6() {
    return M.pure();
  }

  function _7(e) {
    return M.raise(e);
  }
}