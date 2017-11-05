(function () {
  var i, j, len, ref;
  ref = [1, 2, 3];
  i = 0;
  return M.jump(_1, _8);

  function _1() {
    if (i < 3) {
      return M.chain(eff(i), _2, _8);
    } else {
      return M.pure();
    }
  }

  function _2() {
    j = 0, len = ref.length;
    return M.jump(_3, _8);
  }

  function _3() {
    if (j < len) {
      d = ref[j];
      return M.chain(eff(d), _4, _8);
    } else {
      return M.jump(_7, _8);
    }
  }

  function _4(a) {
    if (a) {
      return M.jump(_6, _8);
    } else {
      return M.chain(eff(2), _5, _8);
    }
  }

  function _5(a) {
    if (a) {
      return M.jump(_7, _8);
    } else {
      return M.jump(_6, _8);
    }
  }

  function _6() {
    j++;
    return M.repeat(_3, _8);
  }

  function _7() {
    i++;
    return M.repeat(_1, _8);
  }

  function _8(e) {
    return M.raise(e);
  }
});