function a_1(ref_) {
  ref_.i = 0;
  ref_.i++;
  return M.jM1(eff1(ref_.i), a_2, ref_);
}

function a_2(ref_) {
  if (t) return a_3(ref_);else {
    return M.jM1(eff3(ref_.i), a_5, ref_);
  }
}

function a_3(ref_) {
  return M.jM1(eff2(ref_.i), a_4, ref_);
}

function a_4(ref_) {
  ref_.i++;
  return M.jM1(eff4(ref_.i), a_5, ref_);
}

function a_5(ref_) {
  return M.jM1(eff5(ref_.i), a_6, ref_);
}

function a_6(ref_) {
  ref_.i++;
  return eff6(ref_.i);
}

function a() {
  var ref_ = {
    i: undefined
  };
  return M.jM1(eff0(), a_1, ref_);
}