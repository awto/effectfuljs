function a_1(ref_) {
  if (ee) return a_2(ref_);else return a_3(ref_);
}

function a_2(ref_) {
  return M.jM1(eff7(ref_.i++), a_3, ref_);
}

function a_3(ref_) {
  return eff8(ref_.i);
}

function a() {
  var ref_ = {
    i: undefined
  };
  ref_.i = 0;
  return M.jM1(eff5(ref_.i++), a_1, ref_);
}