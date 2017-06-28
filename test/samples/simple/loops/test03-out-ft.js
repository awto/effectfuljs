function a_1(ref_) {
  return M.jMB1(eff2(), a_2, ref_);
}

function a_2(a, ref_) {
  ref_.i = a;
  return a_3(ref_);
}

function a_3(ref_) {
  if (ref_.i < 10) return a_4(ref_);else {
    return eff6(ref_.i, ref_.j, ref_.k);
  }
}

function a_4(ref_) {
  ref_.k++;
  return M.jMB1(eff3(ref_.i), a_5, ref_);
}

function a_5(a, ref_) {
  ref_.j = a;
  return M.jMB1(eff4(ref_.i), a_6, ref_);
}

function a_6(a, ref_) {
  ref_.l = a;
  ref_.l++;
  return M.jM1(eff5(ref_.j++, ref_.k, ref_.l), a_7, ref_);
}

function a_7(ref_) {
  ref_.i++;
  return M.jNR(a_3, ref_);
}

function a() {
  var ref_ = {
    k: undefined,
    i: undefined,
    j: undefined,
    l: undefined
  };
  ref_.k = 0;
  return M.jM1(eff1(), a_1, ref_);
}