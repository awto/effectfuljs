function a_1(ref_) {
  ref_.i = 0;
  ref_.i++;
  return M.jM1(eff1(ref_.i), a_2, ref_);
}

function a_2(ref_) {
  if (t) return a_3(ref_);else {
    return eff3(ref_.i);
  }
}

function a_3(ref_) {
  return eff2(ref_.i);
}

function a() {
  var ref_ = {
    i: undefined
  };
  return M.jM1(eff0(), a_1, ref_);
}