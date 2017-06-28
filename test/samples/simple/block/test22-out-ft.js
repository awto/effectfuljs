function a_1(ref_) {
  return M.jM1(eff1(ref_.i++, ref_.j++), a_2, ref_);
}

function a_2(ref_) {
  return M.jM1(eff2(ref_.i), a_3, ref_);
}

function a_3(ref_) {
  ref_.i += 1;
  return M.jM1(eff3(2, ref_.j), a_4, ref_);
}

function a_4(ref_) {
  return M.jM1(eff4(ref_.i += 2, ref_.j), a_5, ref_);
}

function a_5(ref_) {
  return eff5(ref_.j);
}

function a() {
  var ref_ = {
    i: undefined,
    j: undefined
  };
  ref_.i = 0;
  ref_.j = 0;
  return M.jM1(eff0(ref_.i, ref_.j), a_1, ref_);
}