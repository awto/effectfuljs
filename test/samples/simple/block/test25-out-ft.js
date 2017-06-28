function a_1(ref_) {
  return M.jM1(eff1(ref_.i++), a_2, ref_);
}

function a_2(ref_) {
  return eff2(ref_.i++);
}

function a_3(ref_) {
  return eff2(ref_.i++);
}

function a() {
  var ref_ = {
    i: undefined
  };
  if (ee) return a_1(ref_);else {
    return M.jM1(eff1(ref_.i++), a_3, ref_);
  }
}