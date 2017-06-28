function _1(ref_) {
  if (ref_.j < ref_.len) return _2(ref_);else return M.pure();
}

function _2(ref_) {
  ref_.i = ref_.ref[ref_.j];
  return M.jM1(eff(ref_.i), _3, ref_);
}

function _3(ref_) {
  ref_.j++;
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
  ref_.j = 0, ref_.len = ref_.ref.length;
  return _1(ref_);
});