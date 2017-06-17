(function () {
  var i, j, d, len, ref;
  ref = [1, 2, 3];
  i = 0, len = ref.lenght;
  return _1();

  function _1() {
    if (i < len) return _2();else {
      return eff(3);
    }
  }

  function _2() {
    j = 0, len = ref.length;
    return _3();
  }

  function _3() {
    if (j < len) return _4();else {
      return M.jM(eff(2), _6);
    }
  }

  function _4() {
    d = ref[j];
    return M.jM(eff(i), _5);
  }

  function _5() {
    j++;
    return M.jR(_3);
  }

  function _6() {
    i++;
    return M.jR(_1);
  }
});