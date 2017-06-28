function a_1(ref_) {
  ref_.i++;
  return M.jM1(eff1(ref_.i), a_2, ref_);
}

function a_2(ref_) {
  return M.jM1(eff1(ref_.i), a_3, ref_);
}

function a_3(ref_) {
  ref_.i++;
  return eff1(ref_.i);
}

function a() {
  var ref_ = {
    i: undefined
  };
  ref_.i = 0;
  return M.jM1(eff0(ref_.i), a_1, ref_);
}