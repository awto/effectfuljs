import * as M from '@effectful/core';

(function () {
  var i, ref;
  ref = [1, 2, 3];
  i = 0;
  return M.jumpH(_1, _7, i, ref);

  function _1(i, ref) {
    if (i < 3) {
      return M.chainBH(eff(i), _2, _7, i, ref);
    } else {
      return M.pure();
    }
  }

  function _2(i, ref) {
    var j, len;
    j = 0, len = ref.length;
    return M.jumpRH(_3, _7, i, j, len, ref);
  }

  function _3(i, j, len, ref) {
    if (j < len) {
      d = ref[j];
      return M.chainBH(eff(d), _4, _7, i, j, len, ref);
    } else {
      return M.jumpH(_6, _7, i, ref);
    }
  }

  function _4(a, i, j, len, ref) {
    if (a) {
      return M.jumpH(_6, _7, i, ref);
    } else {
      return M.chainBH(eff(2), _5, _7, i, j, len, ref);
    }
  }

  function _5(a, i, j, len, ref) {
    if (a) {
      return M.pure();
    } else {
      j++;
      return M.jumpRH(_3, _7, i, j, len, ref);
    }
  }

  function _6(i, ref) {
    i++;
    return M.jumpRH(_1, _7, i, ref);
  }

  function _7(e) {
    return M.raise(e);
  }
});