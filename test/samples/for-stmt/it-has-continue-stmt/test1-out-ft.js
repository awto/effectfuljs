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
  } else return _7(ref_);
}

function _4(a, ref_) {
  if (a) return _6(ref_);else {
    return M.jMB1(eff(2), _5, ref_);
  }
}

function _5(a, ref_) {
  if (a) return _7(ref_);else return _6(ref_);
}

function _6(ref_) {
  ref_.j++;
  return M.jNR(_3, ref_);
}

function _7(ref_) {
  ref_.i++;
  return M.jNR(_1, ref_);
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