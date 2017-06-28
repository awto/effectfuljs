function a_1(a, ref_) {
  return eff1(a);
}

function a() {
  var ref_ = {
    i: undefined
  };
  ref_.i = 0;
  return M.jMB1(eff2(2), a_1, ref_);
}