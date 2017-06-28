function a_1(ref_) {
  ref_.i++;
  return eff(2);
}

function a() {
  var ref_ = {
    i: undefined
  };
  ref_.i = 0;
  return M.jM1(eff(1), a_1, ref_);
}