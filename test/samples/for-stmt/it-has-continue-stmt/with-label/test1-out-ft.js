function _1(ref_) {
  if (ref_.i < 3) {
    return M.jM1(eff(ref_.i), _2, ref_);
  } else return M.pure();
}

function _2(ref_) {
  ref_.j = 0, ref_.len = ref_.ref.length;
  return _3(ref_);
}

function _3(ref_) {
  if (ref_.j < ref_.len) {
    d = ref_.ref[ref_.j];
    return M.jMB1(eff(d), _4, ref_);
  } else return _6(ref_);
}

function _4(a, ref_) {
  if (a) return _5(ref_);else {
    if (t1) return _6(ref_);else return _5(ref_);
  }
}

function _5(ref_) {
  ref_.j++;
  return M.jNR(_3, ref_);
}

function _6(ref_) {
  ref_.i++;
  return M.jNR(_1, ref_);
}

function __1(ref_) {
  if (ref_._i < 3) {
    return M.jM1(eff(ref_._i), __2, ref_);
  } else return M.pure();
}

function __2(ref_) {
  ref_._j = 0, ref_._len = ref_._ref.length;
  return __3(ref_);
}

function __3(ref_) {
  if (ref_._j < ref_._len) {
    d = ref_._ref[ref_._j];
    return M.jMB1(eff(d), __4, ref_);
  } else return _7(ref_);
}

function __4(a, ref_) {
  if (a) return __6(ref_);else {
    return M.jMB1(eff(2), __5, ref_);
  }
}

function __5(a, ref_) {
  if (a) return _7(ref_);else return __6(ref_);
}

function __6(ref_) {
  ref_._j++;
  return M.jNR(__3, ref_);
}

function _7(ref_) {
  ref_._i++;
  return M.jNR(__1, ref_);
}

function _11(ref_) {
  if (ref_.i1 < 3) {
    return M.jM1(eff(ref_.i1), _21, ref_);
  } else {
    return eff(ref_.j1);
  }
}

function _21(ref_) {
  ref_.j1 = 0, ref_.len1 = ref_.ref1.length;
  return _31(ref_);
}

function _31(ref_) {
  if (ref_.j1 < ref_.len1) return _41(ref_);else return _61(ref_);
}

function _41(ref_) {
  d = ref_.ref1[ref_.j1];
  return M.jM1(eff(d), _51, ref_);
}

function _51(ref_) {
  ref_.j1++;
  if (t2) return _61(ref_);else {
    ref_.j1++;
    return M.jNR(_31, ref_);
  }
}

function _61(ref_) {
  ref_.i1++;
  return M.jNR(_11, ref_);
}

function _12(ref_) {
  if (ref_.j2 < ref_.len2) {
    d = ref_.ref2[ref_.j2];
    return M.jM1(eff(d), _22, ref_);
  } else return M.pure();
}

function _22(ref_) {
  ref_.i2++;
  if (t2) return _32(ref_);else return _32(ref_);
}

function _32(ref_) {
  ref_.j2++;
  return M.jNR(_12, ref_);
}

function _13(ref_) {
  if (true) return _23(ref_);else return _42(ref_);
}

function _23(ref_) {
  return M.jM1(eff(ref_.j3), _33, ref_);
}

function _33(ref_) {
  ref_.j3++;
  if (t2) return _42(ref_);else {
    ref_.j3--;
    return M.jNR(_13, ref_);
  }
}

function _42(ref_) {
  return eff(ref_.j3);
}

(function () {
  var ref_ = {
    i: undefined,
    j: undefined,
    len: undefined,
    ref: undefined
  };
  ref_.ref = [1, 2, 3];
  ref_.i = 0;
  return _1(ref_);
});

(function () {
  var ref_ = {
    _i: undefined,
    _j: undefined,
    _len: undefined,
    _ref: undefined
  };
  ref_._ref = [1, 2, 3];
  ref_._i = 0;
  return __1(ref_);
});

(function () {
  var ref_ = {
    i1: undefined,
    j1: undefined,
    len1: undefined,
    ref1: undefined
  };
  ref_.ref1 = [1, 2, 3];
  ref_.i1 = 0;
  return _11(ref_);
});

(function () {
  var ref_ = {
    i2: undefined,
    j2: undefined,
    len2: undefined,
    ref2: undefined
  };
  ref_.ref2 = [1, 2, 3];
  ref_.j2 = 0, ref_.len2 = ref_.ref2.length;
  return _12(ref_);
});

(function () {
  var ref_ = {
    j3: undefined,
    len3: undefined
  };
  ref_.j3 = 0;
  return _13(ref_);
});