import * as M from '@effectful/core';

function a() {
  var i;
  i = 0;
  return M.chain(eff1(i), _1, _5, i);

  function _1(i) {
    var a;
    a = i++;
    return M.chain(eff2(a), _2, _5, i);
  }

  function _2(i) {
    var a;

    if (i) {
      i++;
      return M.jump(void 0, _3, _5, i);
    } else {
      a = i++;
      return M.chain(eff3(a), _3, _5, i);
    }
  }

  function _3(b, i) {
    var a;
    a = i++;
    return M.chain(eff4(a), _4, _5);
  }

  function _4() {
    return M.pure();
  }

  function _5(e) {
    return M.raise(e);
  }
}