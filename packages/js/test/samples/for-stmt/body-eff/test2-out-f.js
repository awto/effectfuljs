(function () {
  var i, j, d, len, ref;
  ref = [1, 2, 3];
  i = 0, len = ref.lenght;
  return M.jump(_1, _6);

  function _1() {
    if (i < len) {
      j = 0, len = ref.length;
      return M.jump(_2, _6);
    } else {
      return M.chain(eff(3), _5, _6);
    }
  }

  function _2() {
    if (j < len) {
      d = ref[j];
      return M.chain(eff(i), _3, _6);
    } else {
      return M.chain(eff(2), _4, _6);
    }
  }

  function _3() {
    j++;
    return M.repeat(_2, _6);
  }

  function _4() {
    i++;
    return M.repeat(_1, _6);
  }

  function _5() {
    return M.pure();
  }

  function _6(e) {
    return M.raise(e);
  }
});