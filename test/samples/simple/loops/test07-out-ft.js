function a_1(ref_) {
  return M.jM1(eff1(ref_.i), a_2, ref_);
}

function a_2(ref_) {
  ref_.k = 10;
  return M.jM1(eff2(), a_3, ref_);
}

function a_3(ref_) {
  return M.jM1R(eff4(ref_.k, ref_.j), a_3, ref_);
}

function a_4(ref_) {
  ref_.i = 20, ref_.j = 30, ref_.k = 40;
  return M.jM1R(eff5(), a_4, ref_);
}

function a() {
  var ref_ = {
    i: undefined,
    j: undefined,
    k: undefined
  };
  ref_.i = 0;
  ref_.j = 0;
  ref_.k = 0;
  return M.jM1(eff(ref_.i, ref_.j, ref_.k), a_1, ref_);
}