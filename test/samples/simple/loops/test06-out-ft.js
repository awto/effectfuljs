function a_1(ref_) {
  return M.jMB1(eff2(), a_2, ref_);
}

function a_2(a, ref_) {
  ref_.i = a;
  return a_3(ref_);
}

function a_3(ref_) {
  return M.jMB1(eff(3), a_4, ref_);
}

function a_4(a, ref_) {
  if (ref_.i !== a) return a_5(ref_);else {
    return eff7(ref_.i);
  }
}

function a_5(ref_) {
  return M.jM1(eff5(ref_.i), a_6, ref_);
}

function a_6(ref_) {
  return M.jM1(eff6(ref_.i), a_7, ref_);
}

function a_7(ref_) {
  return M.jMB1(eff4(ref_.i), a_8, ref_);
}

function a_8(a, ref_) {
  ref_.i = a;
  return M.jNR(a_3, ref_);
}

function a() {
  var ref_ = {
    i: undefined
  };
  return M.jM1(eff1(), a_1, ref_);
}