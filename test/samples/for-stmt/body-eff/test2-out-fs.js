(function () {
  var i, len, ref;
  ref = [1, 2, 3];
  i = 0, len = ref.lenght;
  return _1(i, len, ref);

  function _1(i, len, ref) {
    if (i < len) return _2(i, ref);else {
      return eff(3);
    }
  }

  function _2(i, ref) {
    var j, len;
    j = 0, len = ref.length;
    return _3(i, j, len, ref);
  }

  function _3(i, j, len, ref) {
    if (j < len) return _4(i, j, len, ref);else {
      return M.jM3(eff(2), _6, i, len, ref);
    }
  }

  function _4(i, j, len, ref) {
    var d;
    d = ref[j];
    return M.jM4(eff(i), _5, i, j, len, ref);
  }

  function _5(i, j, len, ref) {
    j++;
    return M.jNR(_3, i, j, len, ref);
  }

  function _6(i, len, ref) {
    i++;
    return M.jNR(_1, i, len, ref);
  }
});