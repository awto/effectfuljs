import * as M from '@effectful/core';

(function () {
  var i, j, len, ref;
  ref = [1, 2, 3];
  j = 0, len = ref.length;
  return M.jump(void 0, _1, _3);

  function _1() {
    if (j < len) {
      i = ref[j];
      return M.chain(eff(i), _2, _3);
    } else {
      return M.pure();
    }
  }

  function _2() {
    j++;
    return M.jump(void 0, _1, _3);
  }

  function _3(e) {
    return M.raise(e);
  }
});