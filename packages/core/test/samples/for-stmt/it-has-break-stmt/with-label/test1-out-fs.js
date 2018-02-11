import * as M from '@effectful/core';

(function () {
  var i, ref;
  ref = [1, 2, 3];
  i = 0;
  return M.jump(void 0, _1, _12, i, ref);

  function _1(i, ref) {
    if (i < 3) {
      return M.chain(eff(i), _2, _12, i, ref);
    } else {
      return M.jump(void 0, _9, _12);
    }
  }

  function _2(i, ref) {
    var j, len;
    j = 0, len = ref.length;
    return M.jump(void 0, _3, _12, i, j, len, ref);
  }

  function _3(i, j, len, ref) {
    if (j < len) {
      d = ref[j];
      return M.chain(eff(d), _4, _12, i, j, len, ref);
    } else {
      return M.jump(void 0, _6, _12, i, ref);
    }
  }

  function _4(a, i, j, len, ref) {
    if (a) {
      return M.jump(void 0, _6, _12, i, ref);
    } else {
      return M.chain(eff(2), _5, _12, i, j, len, ref);
    }
  }

  function _5(a, i, j, len, ref) {
    if (a) {
      return M.jump(void 0, _9, _12);
    } else {
      j++;
      return M.jump(void 0, _3, _12, i, j, len, ref);
    }
  }

  function _6(i, ref) {
    return M.chain(eff(3), _7, _12, i, ref);
  }

  function _7(i, ref) {
    return M.chain(eff(4), _8, _12, i, ref);
  }

  function _8(i, ref) {
    i++;
    return M.jump(void 0, _1, _12, i, ref);
  }

  function _9() {
    return M.chain(eff(5), _10, _12);
  }

  function _10() {
    return M.chain(eff(6), _11, _12);
  }

  function _11() {
    return M.pure();
  }

  function _12(e) {
    return M.raise(e);
  }
});