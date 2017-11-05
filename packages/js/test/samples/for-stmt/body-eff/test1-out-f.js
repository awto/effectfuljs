(function () {
  var i, j, len, ref;
  ref = [1, 2, 3];
  j = 0, len = ref.length;
  return M.jump(_1, _3);

  function _1() {
    if (j < len) {
      i = ref[j];
      return M.chain(eff(i), _2, _3);
    } else {
      return M.pure();
    }
  }

  function _2() {
    j++;
    return M.repeat(_1, _3);
  }

  function _3(e) {
    return M.raise(e);
  }
});