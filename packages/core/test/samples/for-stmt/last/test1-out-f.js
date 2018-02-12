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
    }
  }

  function _2(a) {
    if (a) {} else {
      j++;
      return M.jump(void 0, _1);
    }
  }
});