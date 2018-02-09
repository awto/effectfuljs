import * as M from '@effectful/core';

function a() {
  var i, j;
  return M.chainBH(init(), _1, _8);

  function _1(a) {
    i = a;
    return M.jumpH(_2, _8);
  }

  function _2() {
    return M.chainBH(check(), _3, _8);
  }

  function _3(a) {
    if (a === true) {
      return M.chainBH(initJ(), _4, _8);
    } else {
      return M.pure();
    }
  }

  function _4(a) {
    j = a;
    return M.jumpRH(_5, _8);
  }

  function _5() {
    return M.chainBH(checkJ(), _6, _8);
  }

  function _6(a) {
    if (a === true) {
      if (i === j) {
        return M.chainBH(updJ(), _5, _8);
      } else {
        return M.jumpH(_7, _8);
      }
    } else {
      return M.jumpH(_7, _8);
    }
  }

  function _7() {
    return M.chainBH(upd(), _2, _8);
  }

  function _8(e) {
    return M.raise(e);
  }
}