import * as M from "@effectful/core";

(function () {
  var i, ref;
  ref = [1, 2, 3];
  i = 0;
  return M.jump(void 0, _1, i, ref);

  function _1(i, ref) {
    if (i < 3) {
      return M.chain(eff(i), _2, i, ref);
    } else {
      return M.jump(void 0, _9);
    }
  }

  function _2(i, ref) {
    var j, len;
    j = 0, len = ref.length;
    return M.jump(void 0, _3, i, j, len, ref);
  }

  function _3(i, j, len, ref) {
    if (j < len) {
      d = ref[j];
      return M.chain(eff(d), _4, i, j, len, ref);
    } else {
      return M.jump(void 0, _6, i, ref);
    }
  }

  function _4(a, i, j, len, ref) {
    if (a) {
      return M.jump(void 0, _6, i, ref);
    } else {
      return M.chain(eff(2), _5, i, j, len, ref);
    }
  }

  function _5(a, i, j, len, ref) {
    if (a) {
      return M.jump(void 0, _9);
    } else {
      j++;
      return M.jump(void 0, _3, i, j, len, ref);
    }
  }

  function _6(i, ref) {
    return M.chain(eff(3), _7, i, ref);
  }

  function _7(i, ref) {
    return M.chain(eff(4), _8, i, ref);
  }

  function _8(i, ref) {
    i++;
    return M.jump(void 0, _1, i, ref);
  }

  function _9() {
    return M.chain(eff(5), _10);
  }

  function _10() {
    return M.chain(eff(6), _11);
  }

  function _11() {}
});