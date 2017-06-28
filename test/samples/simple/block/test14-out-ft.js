function a_1(ref_) {
  if (ref_.i++) return a_2(ref_);else {
    return M.jM1(eff2(ref_.i), a_3, ref_);
  }
}

function a_2(ref_) {
  return M.jM1(eff1(ref_.i), a_3, ref_);
}

function a_3(ref_) {
  return eff(ref_.i);
}

function a() {
  var ref_ = {
    i: undefined
  };
  ref_.i = 0;
  return M.jM1(eff(ref_.i), a_1, ref_);
}