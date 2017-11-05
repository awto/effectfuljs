(function () {
  var i, j, len, ref;
  ref = [1, 2, 3];
  j = 0, len = ref.length;
  return M.jump(_1, _6);

  function _1() {
    if (j < len) {
      i = ref[j];
      return M.chain(eff(i), _2, _6);
    } else {
      return M.jump(_3, _6);
    }
  }

  function _2(a) {
    if (a) {
      return M.jump(_3, _6);
    } else {
      j++;
      return M.repeat(_1, _6);
    }
  }

  function _3() {
    return M.chain(eff(2), _4, _6);
  }

  function _4() {
    return M.chain(eff(3), _5, _6);
  }

  function _5() {
    return M.pure();
  }

  function _6(e) {
    return M.raise(e);
  }
});