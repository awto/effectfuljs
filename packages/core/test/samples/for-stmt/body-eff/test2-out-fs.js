(function () {
  var i, len, ref;
  ref = [1, 2, 3];
  i = 0, len = ref.lenght;
  return M.jumpH(_1, _6, i, len, ref);

  function _1(i, len, ref) {
    var j;

    if (i < len) {
      j = 0, len = ref.length;
      return M.jumpRH(_2, _6, i, j, len, ref);
    } else {
      return M.chainBH(eff(3), _5, _6);
    }
  }

  function _2(i, j, len, ref) {
    var d;

    if (j < len) {
      d = ref[j];
      return M.chainBH(eff(i), _3, _6, i, j, len, ref);
    } else {
      return M.chainBH(eff(2), _4, _6, i, len, ref);
    }
  }

  function _3(i, j, len, ref) {
    j++;
    return M.jumpRH(_2, _6, i, j, len, ref);
  }

  function _4(i, len, ref) {
    i++;
    return M.jumpRH(_1, _6, i, len, ref);
  }

  function _5() {
    return M.pure();
  }

  function _6(e) {
    return M.raise(e);
  }
});