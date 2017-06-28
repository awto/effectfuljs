function _1(ref_) {
  if (ref_.i < 3) return _2(ref_);else return _11(ref_);
}

function _2(ref_) {
  return M.jM1(eff(ref_.i), _3, ref_);
}

function _3(ref_) {
  ref_.j = 0, ref_.len = ref_.ref.length;
  return _4(ref_);
}

function _4(ref_) {
  if (ref_.j < ref_.len) return _5(ref_);else return _8(ref_);
}

function _5(ref_) {
  d = ref_.ref[ref_.j];
  return M.jMB1(eff(d), _6, ref_);
}

function _6(a, ref_) {
  if (a) return _8(ref_);else {
    return M.jMB1(eff(2), _7, ref_);
  }
}

function _7(a, ref_) {
  if (a) return _11(ref_);else {
    ref_.j++;
    return M.jNR(_4, ref_);
  }
}

function _8(ref_) {
  return M.jM1(eff(3), _9, ref_);
}

function _9(ref_) {
  return M.jM1(eff(4), _10, ref_);
}

function _10(ref_) {
  ref_.i++;
  return M.jNR(_1, ref_);
}

function _11(ref_) {
  return M.jM1(eff(5), _12, ref_);
}

function _12(ref_) {
  return eff(6);
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