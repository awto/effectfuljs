(function () {
  var i, ref;
  ref = [1, 2, 3];
  i = 0;
  return M.jump(_1, _7, i, ref);

  function _1(i, ref) {
    if (i < 3) {
      return M.chain(eff(i), _2, _7, i, ref);
    } else {
      return M.pure();
    }
  }

  function _2(i, ref) {
    var j, len;
    j = 0, len = ref.length;
    return M.jump(_3, _7, i, j, len, ref);
  }

  function _3(i, j, len, ref) {
    if (j < len) {
      d = ref[j];
      return M.chain(eff(d), _4, _7, i, j, len, ref);
    } else {
      return M.jump(_6, _7, i, ref);
    }
  }

  function _4(a, i, j, len, ref) {
    if (a) {
      return M.jump(_6, _7, i, ref);
    } else {
      return M.chain(eff(2), _5, _7, i, j, len, ref);
    }
  }

  function _5(a, i, j, len, ref) {
    if (a) {
      return M.pure();
    } else {
      j++;
      return M.repeat(_3, _7, i, j, len, ref);
    }
  }

  function _6(i, ref) {
    i++;
    return M.repeat(_1, _7, i, ref);
  }

  function _7(e) {
    return M.raise(e);
  }
});