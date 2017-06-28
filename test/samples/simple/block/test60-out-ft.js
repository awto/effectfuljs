function a_1(a, ref_) {
  ref_.i = a;
  return M.jM1(eff(ref_.i), a_2, ref_);
}

function a_2(ref_) {
  return write(ref_.i);
}

function a() {
  var ref_ = {
    i: undefined
  };
  return M.jMB1(read1(), a_1, ref_);
}