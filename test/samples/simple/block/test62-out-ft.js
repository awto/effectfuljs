function a_1(ref_) {
  return M.jM1(eff(ref_.i++, ref_.j = 1), a_2, ref_);
}

function a_2(ref_) {
  return M.jM1(eff(ref_.j++, ref_.k++), a_3, ref_);
}

function a_3(ref_) {
  return M.jM1(eff(ref_.i), a_4, ref_);
}

function a_4(ref_) {
  return M.jM1(eff(ref_.j = 3), a_5, ref_);
}

function a_5(ref_) {
  return M.jM1(eff(ref_.j), a_6, ref_);
}

function a_6(ref_) {
  return eff(ref_.i);
}

function a(i) {
  var ref_ = {
    j: undefined,
    k: undefined
  };
  ref_.k = 0;
  return M.jM1(eff(ref_.i), a_1, ref_);
}