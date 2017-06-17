(function () {
  ref = [1, 2, 3];
  i = 0;
  return _1(i, ref);

  function _1(i, ref) {
    if (i < 3) {
      return M.jM2(eff(i), _2, i, ref);
    } else return M.pure();
  }

  function _2(i, ref) {
    var j, len;
    j = 0, len = ref.length;
    return _3(i, j, len, ref);
  }

  function _3(i, j, len, ref) {
    if (j < len) {
      d = ref[j];
      return M.jMB4(eff(d), _4, i, j, len, ref);
    } else return _7(i, ref);
  }

  function _4(a, i, j, len, ref) {
    if (a) return _6(i, j, len, ref);else {
      return M.jMB4(eff(2), _5, i, j, len, ref);
    }
  }

  function _5(a, i, j, len, ref) {
    if (a) return _7(i, ref);else return _6(i, j, len, ref);
  }

  function _6(i, j, len, ref) {
    j++;
    return M.jNR(_3, i, j, len, ref);
  }

  function _7(i, ref) {
    i++;
    return M.jNR(_1, i, ref);
  }
});