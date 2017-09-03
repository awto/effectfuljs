(function () {
  var i, ref;
  ref = [1, 2, 3];
  i = 0;
  return _1(i, ref);
});

(function () {
  var i, ref;
  ref = [1, 2, 3];
  i = 0;
  return _7(i, ref);
});

(function () {
  var i, ref;
  ref = [1, 2, 3];
  i = 0;
  return _14(i, undefined, ref);
});

(function () {
  var j, len, ref;
  ref = [1, 2, 3];
  j = 0, len = ref.length;
  return _21(j, len, ref);
});

(function () {
  var j,
      _v = {
    len: undefined
  };
  j = 0;
  return _24(j);
});

function _1(i, ref) {
  if (i < 3) {
    return M.j(eff(i), _2, i, ref);
  } else {
    return M.pure();
  }
}

function _2(i, ref) {
  var j, len;
  j = 0, len = ref.length;
  return _3(i, j, len, ref);
}

function _3(i, j, len, ref) {
  if (j < len) {
    d = ref[j];
    return M.jB(eff(d), _4, i, j, len, ref);
  } else return _6(i, ref);
}

function _4(a, i, j, len, ref) {
  if (a) return _5(i, j, len, ref);else {
    if (t1) return _6(i, ref);else return _5(i, j, len, ref);
  }
}

function _5(i, j, len, ref) {
  j++;
  return M.jR(_3, i, j, len, ref);
}

function _6(i, ref) {
  i++;
  return M.jR(_1, i, ref);
}

function _7(i, ref) {
  if (i < 3) {
    return M.j(eff(i), _8, i, ref);
  } else {
    return M.pure();
  }
}

function _8(i, ref) {
  var j, len;
  j = 0, len = ref.length;
  return _9(i, j, len, ref);
}

function _9(i, j, len, ref) {
  if (j < len) {
    d = ref[j];
    return M.jB(eff(d), _10, i, j, len, ref);
  } else return _13(i, ref);
}

function _10(a, i, j, len, ref) {
  if (a) return _12(i, j, len, ref);else {
    return M.jB(eff(2), _11, i, j, len, ref);
  }
}

function _11(a, i, j, len, ref) {
  if (a) return _13(i, ref);else return _12(i, j, len, ref);
}

function _12(i, j, len, ref) {
  j++;
  return M.jR(_9, i, j, len, ref);
}

function _13(i, ref) {
  i++;
  return M.jR(_7, i, ref);
}

function _14(i, j, ref) {
  if (i < 3) {
    return M.j(eff(i), _15, i, ref);
  } else {
    return M.j(eff(j), _20);
  }
}

function _15(i, ref) {
  var j, len;
  j = 0, len = ref.length;
  return _16(i, j, len, ref);
}

function _16(i, j, len, ref) {
  if (j < len) return _17(i, j, len, ref);else return _19(i, j, ref);
}

function _17(i, j, len, ref) {
  d = ref[j];
  return M.j(eff(d), _18, i, j, len, ref);
}

function _18(i, j, len, ref) {
  j++;
  if (t2) return _19(i, j, ref);else {
    j++;
    return M.jR(_16, i, j, len, ref);
  }
}

function _19(i, j, ref) {
  i++;
  return M.jR(_14, i, j, ref);
}

function _20() {
  return M.pure();
}

function _21(j, len, ref) {
  if (j < len) {
    d = ref[j];
    return M.j(eff(d), _22, j, len, ref);
  } else {
    return M.pure();
  }
}

function _22(j, len, ref) {
  var i;
  i++;
  if (t2) return _23(j, len, ref);else return _23(j, len, ref);
}

function _23(j, len, ref) {
  j++;
  return M.jR(_21, j, len, ref);
}

function _24(j) {
  if (true) return _25(j);else return _27(j);
}

function _25(j) {
  return M.j(eff(j), _26, j);
}

function _26(j) {
  j++;
  if (t2) return _27(j);else {
    j--;
    return M.jR(_24, j);
  }
}

function _27(j) {
  return M.j(eff(j), _28);
}

function _28() {
  return M.pure();
}