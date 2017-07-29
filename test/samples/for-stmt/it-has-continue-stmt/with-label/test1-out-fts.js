function _1(i, ref) {
  if (i < 3) {
    return M.jM(eff(i), _2, i, ref);
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
    return M.jMB(eff(d), _4, i, j, len, ref);
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

function __1(i, ref) {
  if (i < 3) {
    return M.jM(eff(i), __2, i, ref);
  } else return M.pure();
}

function __2(i, ref) {
  var j, len;
  j = 0, len = ref.length;
  return __3(i, j, len, ref);
}

function __3(i, j, len, ref) {
  if (j < len) {
    d = ref[j];
    return M.jMB(eff(d), __4, i, j, len, ref);
  } else return _7(i, ref);
}

function __4(a, i, j, len, ref) {
  if (a) return __6(i, j, len, ref);else {
    return M.jMB(eff(2), __5, i, j, len, ref);
  }
}

function __5(a, i, j, len, ref) {
  if (a) return _7(i, ref);else return __6(i, j, len, ref);
}

function __6(i, j, len, ref) {
  j++;
  return M.jR(__3, i, j, len, ref);
}

function _7(i, ref) {
  i++;
  return M.jR(__1, i, ref);
}

function _11(i, j, ref) {
  if (i < 3) {
    return M.jM(eff(i), _21, i, ref);
  } else {
    return eff(j);
  }
}

function _21(i, ref) {
  var j, len;
  j = 0, len = ref.length;
  return _31(i, j, len, ref);
}

function _31(i, j, len, ref) {
  if (j < len) return _41(i, j, len, ref);else return _61(i, j, ref);
}

function _41(i, j, len, ref) {
  d = ref[j];
  return M.jM(eff(d), _51, i, j, len, ref);
}

function _51(i, j, len, ref) {
  j++;
  if (t2) return _61(i, j, ref);else {
    j++;
    return M.jR(_31, i, j, len, ref);
  }
}

function _61(i, j, ref) {
  i++;
  return M.jR(_11, i, j, ref);
}

function _12(j, len, ref) {
  if (j < len) {
    d = ref[j];
    return M.jM(eff(d), _22, j, len, ref);
  } else return M.pure();
}

function _22(j, len, ref) {
  var i;
  i++;
  if (t2) return _32(j, len, ref);else return _32(j, len, ref);
}

function _32(j, len, ref) {
  j++;
  return M.jR(_12, j, len, ref);
}

function _13(j) {
  if (true) return _23(j);else return _42(j);
}

function _23(j) {
  return M.jM(eff(j), _33, j);
}

function _33(j) {
  j++;
  if (t2) return _42(j);else {
    j--;
    return M.jR(_13, j);
  }
}

function _42(j) {
  return eff(j);
}

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
  return __1(i, ref);
});

(function () {
  var i, ref;
  ref = [1, 2, 3];
  i = 0;
  return _11(i, undefined, ref);
});

(function () {
  var j, len, ref;
  ref = [1, 2, 3];
  j = 0, len = ref.length;
  return _12(j, len, ref);
});

(function () {
  var j;
  j = 0;
  return _13(j);
});