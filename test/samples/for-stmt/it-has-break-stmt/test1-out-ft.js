function _1(ref_) {
  if (ref_.j < ref_.len) return _2(ref_);else return _4(ref_);
}

function _2(ref_) {
  ref_.i = ref_.ref[ref_.j];
  return M.jMB1(eff(ref_.i), _3, ref_);
}

function _3(a, ref_) {
  if (a) return _4(ref_);else {
    ref_.j++;
    return M.jNR(_1, ref_);
  }
}

function _4(ref_) {
  return M.jM1(eff(2), _5, ref_);
}

function _5(ref_) {
  return eff(3);
}

(function () {
  var ref_ = {
    i: undefined,
    j: undefined,
    len: undefined,
    ref: undefined
  };
  ref_.ref = [1, 2, 3];
  ref_.j = 0, ref_.len = ref_.ref.length;
  return _1(ref_);
});