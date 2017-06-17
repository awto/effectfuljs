(function () {
  var i, j, len, ref;
  ref = [1, 2, 3];
  j = 0, len = ref.length;
  return _1();

  function _1() {
    if (j < len) return _2();else return M.pure();
  }

  function _2() {
    i = ref[j];
    return M.jM(eff(i), _3);
  }

  function _3() {
    j++;
    return M.jR(_1);
  }
});