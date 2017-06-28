function a_1(a, ref_) {
  return M.jM1(eff1(a, ref_.i++), a_2, ref_);
}

function a_2(ref_) {
  return M.jM1(eff3(ref_.i++), a_3, ref_);
}

function a_3(ref_) {
  return M.jM1(eff4(ref_.i++), a_4, ref_);
}

function a_4(ref_) {
  return M.jM1(eff5(ref_.i++), a_5, ref_);
}

function a_5(ref_) {
  var a;
  const a = ref_.i++;
  return M.jMB1(eff6(a), a_6, ref_);
}

function a_6(a, ref_) {
  if (a) return a_7(ref_);else {
    return M.jMB1(eff7(ref_.i), a_8, ref_);
  }
}

function a_7(ref_) {
  return M.jM1(eff7(ref_.i++), a_12, ref_);
}

function a_8(a, ref_) {
  if (a) return a_9(ref_);else {
    return M.pure(10);
  }
}

function a_9(ref_) {
  ref_.i++;
  return a_11(ref_);
}

function a_10(ref_) {
  return M.jM1(eff7(ref_.i++), a_11, ref_);
}

function a_11(ref_) {
  return M.jM1(eff8(ref_.i++), a_12, ref_);
}

function a_12(ref_) {
  return M.jM1(eff9(ref_.i++), a_13, ref_);
}

function a_13(ref_) {
  return eff10(ref_.i++);
}

function a() {
  var ref_ = {
    i: undefined
  };
  const a = ref_.i = 0;
  return M.jMB1(eff2(a), a_1, ref_);
}