import * as M from "@effectful/core";
(function () {
  var i, j, len, ref;
  ref = [1, 2, 3];
  i = 0;
  return M.jump(void 0, _1);
  function _1() {
    if (i < 3) {
      return M.chain(eff(i), _2);
    } else {
      return M.jump(void 0, _9);
    }
  }
  function _2() {
    j = 0, len = ref.length;
    return M.jump(void 0, _3);
  }
  function _3() {
    if (j < len) {
      d = ref[j];
      return M.chain(eff(d), _4);
    } else {
      return M.jump(void 0, _6);
    }
  }
  function _4(a) {
    if (a) {
      return M.jump(void 0, _6);
    } else {
      return M.chain(eff(2), _5);
    }
  }
  function _5(a) {
    if (a) {
      return M.jump(void 0, _9);
    } else {
      j++;
      return M.jump(void 0, _3);
    }
  }
  function _6() {
    return M.chain(eff(3), _7);
  }
  function _7() {
    return M.chain(eff(4), _8);
  }
  function _8() {
    i++;
    return M.jump(void 0, _1);
  }
  function _9() {
    return M.chain(eff(5), _10);
  }
  function _10() {
    return M.chain(eff(6), _11);
  }
  function _11() {}
});