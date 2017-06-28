function a_1(a, ref_) {
  ref_.i = a;
  return M.jM1(eff2(ref_.i), a_2, ref_);
}

function a_2(ref_) {
  var a;
  const a = ref_.i++;
  return M.jMB1(eff3(a), a_3, ref_);
}

function a_3(a, ref_) {
  ref_.i = a;
  return eff4(ref_.i);
}

function a() {
  var ref_ = {
    i: undefined
  };
  const a = ref_.i++;
  return M.jMB1(eff1(a), a_1, ref_);
}