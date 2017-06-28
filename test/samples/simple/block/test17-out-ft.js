function a_1(ref_) {
  ref_.i++;
  return eff2(ref_.i);
}

function a() {
  var ref_ = {
    i: undefined
  };
  ref_.i = 0;
  return M.jM1(eff1(ref_.i), a_1, ref_);
}