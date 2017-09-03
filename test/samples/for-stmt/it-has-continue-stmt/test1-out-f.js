(function () {
  var i, j, len, ref;
  ref = [1, 2, 3];
  i = 0;
  return _1();

  function _1() {
    if (i < 3) {
      return M.j(eff(i), _2);
    } else {
      return M.pure();
    }
  }

  function _2() {
    j = 0, len = ref.length;
    return _3();
  }

  function _3() {
    if (j < len) {
      d = ref[j];
      return M.jB(eff(d), _4);
    } else return _7();
  }

  function _4(a) {
    if (a) return _6();else {
      return M.jB(eff(2), _5);
    }
  }

  function _5(a) {
    if (a) return _7();else return _6();
  }

  function _6() {
    j++;
    return M.jR(_3);
  }

  function _7() {
    i++;
    return M.jR(_1);
  }
});