(function () {
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
    return M.jNR(_3, i, j, len, ref);
  }

  function _6(i, ref) {
    i++;
    return M.jNR(_1, i, ref);
  }
});

(function () {
  _ref = [1, 2, 3];
  _i = 0;
  return _1(_i, _ref);

  function _1(_i, _ref) {
    if (_i < 3) {
      return M.jM2(eff(_i), _2, _i, _ref);
    } else return M.pure();
  }

  function _2(_i, _ref) {
    var j, len;
    j = 0, len = _ref.length;
    return _3(_i, j, len, _ref);
  }

  function _3(_i, j, len, _ref) {
    if (j < len) {
      d = _ref[j];
      return M.jMB4(eff(d), _4, _i, j, len, _ref);
    } else return _7(_i, _ref);
  }

  function _4(a, _i, j, len, _ref) {
    if (a) return _6(_i, j, len, _ref);else {
      return M.jMB4(eff(2), _5, _i, j, len, _ref);
    }
  }

  function _5(a, _i, j, len, _ref) {
    if (a) return _7(_i, _ref);else return _6(_i, j, len, _ref);
  }

  function _6(_i, j, len, _ref) {
    j++;
    return M.jNR(_3, _i, j, len, _ref);
  }

  function _7(_i, _ref) {
    _i++;
    return M.jNR(_1, _i, _ref);
  }
});

(function () {
  ref1 = [1, 2, 3];
  i1 = 0;
  return _1(i1, undefined, ref1);

  function _1(i1, j, ref1) {
    if (i1 < 3) {
      return M.jM2(eff(i1), _2, i1, ref1);
    } else {
      return eff(j);
    }
  }

  function _2(i1, ref1) {
    var j, len;
    j = 0, len = ref1.length;
    return _3(i1, j, len, ref1);
  }

  function _3(i1, j, len, ref1) {
    if (j < len) return _4(i1, j, len, ref1);else return _6(i1, j, ref1);
  }

  function _4(i1, j, len, ref1) {
    d = ref1[j];
    return M.jM4(eff(d), _5, i1, j, len, ref1);
  }

  function _5(i1, j, len, ref1) {
    j++;
    if (t2) return _6(i1, j, ref1);else {
      j++;
      return M.jNR(_3, i1, j, len, ref1);
    }
  }

  function _6(i1, j, ref1) {
    i1++;
    return M.jNR(_1, i1, j, ref1);
  }
});

(function () {
  ref2 = [1, 2, 3];
  j = 0, len = ref2.length;
  return _1(j, len, ref2);

  function _1(j, len, ref2) {
    if (j < len) {
      d = ref2[j];
      return M.jM3(eff(d), _2, j, len, ref2);
    } else return M.pure();
  }

  function _2(j, len, ref2) {
    var i;
    i++;
    if (t2) return _3(j, len, ref2);else return _3(j, len, ref2);
  }

  function _3(j, len, ref2) {
    j++;
    return M.jNR(_1, j, len, ref2);
  }
});

(function () {
  var len;
  _j = 0;
  return _1(_j);

  function _1(_j) {
    if (true) return _2(_j);else return _4(_j);
  }

  function _2(_j) {
    return M.jM1(eff(_j), _3, _j);
  }

  function _3(_j) {
    _j++;
    if (t2) return _4(_j);else {
      _j--;
      return M.jNR(_1, _j);
    }
  }

  function _4(_j) {
    return eff(_j);
  }
});