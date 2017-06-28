function a_1(ref_) {
  return eff2(ref_.i++);
}

function a() {
  var ref_ = {
    i: undefined
  };
  return M.jM1(eff1(ref_.i++), a_1, ref_);
}