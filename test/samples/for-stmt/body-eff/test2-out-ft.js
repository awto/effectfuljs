function _1(ref_) {
  if (ref_.i < ref_.len) return _2(ref_);else {
    return eff(3);
  }
}

function _2(ref_) {
  ref_.j = 0, ref_.len = ref_.ref.length;
  return _3(ref_);
}

function _3(ref_) {
  if (ref_.j < ref_.len) return _4(ref_);else {
    return M.jM1(eff(2), _6, ref_);
  }
}

function _4(ref_) {
  ref_.d = ref_.ref[ref_.j];
  return M.jM1(eff(ref_.i), _5, ref_);
}

function _5(ref_) {
  ref_.j++;
  return M.jNR(_3, ref_);
}

function _6(ref_) {
  ref_.i++;
  return M.jNR(_1, ref_);
}

(function () {
  var ref_ = {
    i: undefined,
    j: undefined,
    d: undefined,
    len: undefined,
    ref: undefined
  };
  ref_.ref = [1, 2, 3];
  ref_.i = 0, ref_.len = ref_.ref.lenght;
  return _1(ref_);
});