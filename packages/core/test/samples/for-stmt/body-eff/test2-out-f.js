(function () {
  var i, j, d, len, ref;
  ref = [1, 2, 3];
  i = 0, len = ref.lenght;
  return M.jumpH(_1, _6);

  function _1() {
    if (i < len) {
      j = 0, len = ref.length;
      return M.jumpRH(_2, _6);
    } else {
      return M.chainBH(eff(3), _5, _6);
    }
  }

  function _2() {
    if (j < len) {
      d = ref[j];
      return M.chainBH(eff(i), _3, _6);
    } else {
      return M.chainBH(eff(2), _4, _6);
    }
  }

  function _3() {
    j++;
    return M.jumpRH(_2, _6);
  }

  function _4() {
    i++;
    return M.jumpRH(_1, _6);
  }

  function _5() {
    return M.pure();
  }

  function _6(e) {
    return M.raise(e);
  }
});