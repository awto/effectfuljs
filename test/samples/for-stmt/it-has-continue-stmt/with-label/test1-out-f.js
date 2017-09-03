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
    } else return _6();
  }

  function _4(a) {
    if (a) return _5();else {
      if (t1) return _6();else return _5();
    }
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

(function () {
  var i, j, len, ref;
  ref = [1, 2, 3];
  i = 0;
  return _1();

  function _1() {
    if (i < 3) {
      return M.j(eff(i), _2);
    } else {
      return M.j(eff(j), _7);
    }
  }

  function _2() {
    j = 0, len = ref.length;
    return _3();
  }

  function _3() {
    if (j < len) return _4();else return _6();
  }

  function _4() {
    d = ref[j];
    return M.j(eff(d), _5);
  }

  function _5() {
    j++;
    if (t2) return _6();else {
      j++;
      return M.jR(_3);
    }
  }

  function _6() {
    i++;
    return M.jR(_1);
  }

  function _7() {
    return M.pure();
  }
});

(function () {
  var i, j, len, ref;
  ref = [1, 2, 3];
  j = 0, len = ref.length;
  return _1();

  function _1() {
    if (j < len) {
      d = ref[j];
      return M.j(eff(d), _2);
    } else {
      return M.pure();
    }
  }

  function _2() {
    i++;
    if (t2) return _3();else return _3();
  }

  function _3() {
    j++;
    return M.jR(_1);
  }
});

(function () {
  var j, len;
  j = 0;
  return _1();

  function _1() {
    if (true) return _2();else return _4();
  }

  function _2() {
    return M.j(eff(j), _3);
  }

  function _3() {
    j++;
    if (t2) return _4();else {
      j--;
      return M.jR(_1);
    }
  }

  function _4() {
    return M.j(eff(j), _5);
  }

  function _5() {
    return M.pure();
  }
});