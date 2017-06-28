function a_1(ref_) {
  return M.jM1(eff(ref_.j++), a_2, ref_);
}

function a_2(ref_) {
  return M.jM1(eff2(ref_.j), a_3, ref_);
}

function a_3(ref_) {
  return eff3(ref_.j++);
}

function a() {
  var ref_ = {
    j: undefined
  };
  ref_.j = 0;
  return M.jM1(eff(ref_.j), a_1, ref_);
}