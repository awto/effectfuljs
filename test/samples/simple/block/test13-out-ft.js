function a_1(ref_) {
  return M.jM1(eff1(ref_.i), a_2, ref_);
}

function a_2(ref_) {
  return M.jM1(eff2(ref_.i), a_3, ref_);
}

function a_3(ref_) {
  return eff3(ref_.i);
}

function a() {
  var ref_ = {
    i: undefined
  };
  ref_.i = 0;
  if (t) return a_1(ref_);else {
    ref_.i++;
    return a_2(ref_);
  }
}