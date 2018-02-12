import * as M from '@effectful/core';

(function () {
  var i, j, len, ref;
  ref = [1, 2, 3];
  j = 0, len = ref.length;
  return M.jump(void 0, _1);

  function _1() {
    if (j < len) {
      i = ref[j];
      return M.chain(eff(i), _2);
    } else {
      return M.jump(void 0, _3);
    }
  }

  function _2(a) {
    if (a) {
      return M.jump(void 0, _3);
    } else {
      j++;
      return M.jump(void 0, _1);
    }
  }

  function _3() {
    return M.chain(eff(2), _4);
  }

  function _4() {
    return M.chain(eff(3), _5);
  }

  function _5() {}
});