(function () {
  var i, j, len, ref;
  ref = [1, 2, 3];
  j = 0, len = ref.length;
  return _1();

  function _1() {
    if (j < len) return _2();else return _4();
  }

  function _2() {
    i = ref[j];
    return M.jB(eff(i), _3);
  }

  function _3(a) {
    if (a) return _4();else {
      j++;
      return M.jR(_1);
    }
  }

  function _4() {
    return M.pure();
  }
});