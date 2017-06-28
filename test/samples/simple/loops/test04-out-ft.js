function a_1(ref_) {
  return M.jMB1(eff2(), a_2, ref_);
}

function a_2(a, ref_) {
  ref_.i = a;
  return a_3(ref_);
}

function a_3(ref_) {
  if (ref_.i < 10) return a_4(ref_);else {
    return eff7(ref_.i);
  }
}

function a_4(ref_) {
  return M.jM1(eff3(ref_.i, ref_.j), a_5, ref_);
}

function a_5(ref_) {
  return M.jM1(eff4(ref_.j++), a_6, ref_);
}

function a_6(ref_) {
  ref_.i++;
  return M.jNR(a_3, ref_);
}

function a() {
  var ref_ = {
    j: undefined,
    i: undefined
  };
  return M.jM1(eff1(), a_1, ref_);
}