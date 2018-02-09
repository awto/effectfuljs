import * as M from '@effectful/core';

(function () {
  var i, j, len, ref;
  ref = [1, 2, 3];
  i = 0;
  return M.jumpH(_1, _7);

  function _1() {
    if (i < 3) {
      return M.chainBH(eff(i), _2, _7);
    } else {
      return M.pure();
    }
  }

  function _2() {
    j = 0, len = ref.length;
    return M.jumpRH(_3, _7);
  }

  function _3() {
    if (j < len) {
      d = ref[j];
      return M.chainBH(eff(d), _4, _7);
    } else {
      return M.jumpH(_6, _7);
    }
  }

  function _4(a) {
    if (a) {
      return M.jumpH(_6, _7);
    } else {
      return M.chainBH(eff(2), _5, _7);
    }
  }

  function _5(a) {
    if (a) {
      return M.pure();
    } else {
      j++;
      return M.jumpRH(_3, _7);
    }
  }

  function _6() {
    i++;
    return M.jumpRH(_1, _7);
  }

  function _7(e) {
    return M.raise(e);
  }
});