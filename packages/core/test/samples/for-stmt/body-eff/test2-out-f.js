import * as M from "@effectful/core";
(function () {
  var i, j, d, len, ref;
  ref = [1, 2, 3];
  i = 0, len = ref.lenght;
  return M.jump(void 0, _1);
  function _1() {
    if (i < len) {
      j = 0, len = ref.length;
      return M.jump(void 0, _2);
    } else {
      return M.chain(eff(3), _5);
    }
  }
  function _2() {
    if (j < len) {
      d = ref[j];
      return M.chain(eff(i), _3);
    } else {
      return M.chain(eff(2), _4);
    }
  }
  function _3() {
    j++;
    return M.jump(void 0, _2);
  }
  function _4() {
    i++;
    return M.jump(void 0, _1);
  }
  function _5() {}
});