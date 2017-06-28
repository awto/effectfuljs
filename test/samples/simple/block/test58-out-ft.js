function a_1(ref_) {
  ref_.i += 2;
  return M.jM1(effM(), a_2, ref_);
}

function a_2(ref_) {
  return M.jM1(effN(), a_3, ref_);
}

function a_3(ref_) {
  var a;
  const a = ++ref_.i;
  return M.jMB1(effI1(a), a_4, ref_);
}

function a_4(a, ref_) {
  return M.jMB1(eff2(a), a_5, ref_);
}

function a_5(a, ref_) {
  const b = ref_.i++;
  return M.jMB2(eff3(ref_.i), a_6, ref_, a);
}

function a_6(c, ref_, a) {
  var b;
  return M.jM1(eff1(a, b, c), a_7, ref_);
}

function a_7(ref_) {
  return M.jMB1(effN(), a_8, ref_);
}

function a_8(a, ref_) {
  return M.jMB1(effI(a), a_9, ref_);
}

function a_9(a, ref_) {
  return M.jM1(effM(a), a_10, ref_);
}

function a_10(ref_) {
  return M.jMB1(effI(), a_11, ref_);
}

function a_11(a, ref_) {
  return M.jMB2(effJ(), a_12, ref_, a);
}

function a_12(b, ref_, a) {
  return M.jM1(eff4(a, b), a_13, ref_);
}

function a_13(ref_) {
  return eff5();
}

function a() {
  var ref_ = {
    i: undefined
  };
  ref_.i = 0;
  return M.jM1(eff0(), a_1, ref_);
}