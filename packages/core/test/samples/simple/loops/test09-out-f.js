import * as M from '@effectful/core';

function a() {
  var i;
  return M.chainBH(init(), _1, _5);

  function _1(a) {
    i = a;
    return M.jumpH(_2, _5);
  }

  function _2() {
    return M.chainBH(check(), _3, _5);
  }

  function _3(b) {
    if (b === true) {
      if (a) {
        return M.chainBH(eff(1), _4, _5);
      } else {
        return M.jumpRH(_4, _5);
      }
    } else {
      return M.pure();
    }
  }

  function _4() {
    return M.chainBH(upd(), _2, _5);
  }

  function _5(e) {
    return M.raise(e);
  }
}