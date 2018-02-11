import * as M from '@effectful/core';

(function () {
  var j, len, ref;
  ref = [1, 2, 3];
  j = 0, len = ref.length;
  return M.jump(void 0, _1, _3, j, len, ref);

  function _1(j, len, ref) {
    var i;

    if (j < len) {
      i = ref[j];
      return M.chain(eff(i), _2, _3, j, len, ref);
    } else {
      return M.pure();
    }
  }

  function _2(a, j, len, ref) {
    if (a) {
      return M.pure();
    } else {
      j++;
      return M.jump(void 0, _1, _3, j, len, ref);
    }
  }

  function _3(e) {
    return M.raise(e);
  }
});