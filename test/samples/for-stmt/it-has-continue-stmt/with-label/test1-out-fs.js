(function () {
  var i, ref;
  ref = [1, 2, 3];
  i = 0;
  return _1(i, ref);

  function _1(i, ref) {
    if (i < 3) {
      return M.jM2(eff(i), _2, i, ref);
    } else return M.pure();
  }

  function _2(i, ref) {
    var j, len;
    j = 0, len = ref.length;
    return _3(i, j, len, ref);
  }

  function _3(i, j, len, ref) {
    if (j < len) {
      d = ref[j];
      return M.jMB4(eff(d), _4, i, j, len, ref);
    } else return _6(i, ref);
  }

  function _4(a, i, j, len, ref) {
    if (a) return _5(i, j, len, ref);else {
      if (t1) return _6(i, ref);else return _5(i, j, len, ref);
    }
  }

  function _5(i, j, len, ref) {
    j++;
    return M.jR4(_3, i, j, len, ref);
  }

  function _6(i, ref) {
    i++;
    return M.jR2(_1, i, ref);
  }
});

(function () {
  var i, ref;
  ref = [1, 2, 3];
  i = 0;
  return _1(i, ref);

  function _1(i, ref) {
    if (i < 3) {
      return M.jM2(eff(i), _2, i, ref);
    } else return M.pure();
  }

  function _2(i, ref) {
    var j, len;
    j = 0, len = ref.length;
    return _3(i, j, len, ref);
  }

  function _3(i, j, len, ref) {
    if (j < len) {
      d = ref[j];
      return M.jMB4(eff(d), _4, i, j, len, ref);
    } else return _7(i, ref);
  }

  function _4(a, i, j, len, ref) {
    if (a) return _6(i, j, len, ref);else {
      return M.jMB4(eff(2), _5, i, j, len, ref);
    }
  }

  function _5(a, i, j, len, ref) {
    if (a) return _7(i, ref);else return _6(i, j, len, ref);
  }

  function _6(i, j, len, ref) {
    j++;
    return M.jR4(_3, i, j, len, ref);
  }

  function _7(i, ref) {
    i++;
    return M.jR2(_1, i, ref);
  }
});

(function () {
  var i, ref;
  ref = [1, 2, 3];
  i = 0;
  return _1(i, undefined, ref);

  function _1(i, j, ref) {
    if (i < 3) {
      return M.jM2(eff(i), _2, i, ref);
    } else {
      return eff(j);
    }
  }

  function _2(i, ref) {
    var j, len;
    j = 0, len = ref.length;
    return _3(i, j, len, ref);
  }

  function _3(i, j, len, ref) {
    if (j < len) return _4(i, j, len, ref);else return _6(i, j, ref);
  }

  function _4(i, j, len, ref) {
    d = ref[j];
    return M.jM4(eff(d), _5, i, j, len, ref);
  }

  function _5(i, j, len, ref) {
    j++;
    if (t2) return _6(i, j, ref);else {
      j++;
      return M.jR4(_3, i, j, len, ref);
    }
  }

  function _6(i, j, ref) {
    i++;
    return M.jR3(_1, i, j, ref);
  }
});

(function () {
  var j, len, ref;
  ref = [1, 2, 3];
  j = 0, len = ref.length;
  return _1(j, len, ref);

  function _1(j, len, ref) {
    if (j < len) {
      d = ref[j];
      return M.jM3(eff(d), _2, j, len, ref);
    } else return M.pure();
  }

  function _2(j, len, ref) {
    var i;
    i++;
    if (t2) return _3(j, len, ref);else return _3(j, len, ref);
  }

  function _3(j, len, ref) {
    j++;
    return M.jR3(_1, j, len, ref);
  }
});

(function () {
  var len;
  var j;
  j = 0;
  return _1(j);

  function _1(j) {
    if (true) return _2(j);else return _4(j);
  }

  function _2(j) {
    return M.jM1(eff(j), _3, j);
  }

  function _3(j) {
    j++;
    if (t2) return _4(j);else {
      j--;
      return M.jR1(_1, j);
    }
  }

  function _4(j) {
    return eff(j);
  }
});