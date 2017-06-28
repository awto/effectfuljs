function a_1(ref_) {
  return M.jM1(eff1(ref_.i), a_2, ref_);
}

function a_2(ref_) {
  ref_.i += 1;
  return M.jM1(eff2(2), a_3, ref_);
}

function a_3(ref_) {
  return eff3(ref_.i += 2);
}

function a() {
  var ref_ = {
    i: undefined
  };
  ref_.i = 0;
  return M.jM1(eff0(ref_.i++), a_1, ref_);
}