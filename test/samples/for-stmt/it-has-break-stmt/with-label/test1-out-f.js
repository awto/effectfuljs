(function () {
  var i, j, len, ref;
  ref = [1, 2, 3];
  i = 0;
  return _1();

  function _1() {
    if (i < 3) return _2();else return _11();
  }

  function _2() {
    return M.jM(eff(i), _3);
  }

  function _3() {
    j = 0, len = ref.length;
    return _4();
  }

  function _4() {
    if (j < len) return _5();else return _8();
  }

  function _5() {
    d = ref[j];
    return M.jMB(eff(d), _6);
  }

  function _6(a) {
    if (a) return _8();else {
      return M.jMB(eff(2), _7);
    }
  }

  function _7(a) {
    if (a) return _11();else {
      j++;
      return M.jR(_4);
    }
  }

  function _8() {
    return M.jM(eff(3), _9);
  }

  function _9() {
    return M.jM(eff(4), _10);
  }

  function _10() {
    i++;
    return M.jR(_1);
  }

  function _11() {
    return M.jM(eff(5), _12);
  }

  function _12() {
    return eff(6);
  }
});