function a_1(ref_1) {
  ref_1.ref_2.a;
  if (test) return a_2(ref_1);else {
    return M.jM1(eff(5), a_4, ref_1);
  }
}

function a_2(ref_1) {
  b;
  return M.jM1(eff(3), a_3, ref_1);
}

function a_3(ref_1) {
  c;
  return M.jM1(eff(4), a_4, ref_1);
}

function a_4(ref_1) {
  return eff(6);
}

function a() {
  var ref_1 = {
    ref_2: ref_2
  };
  return M.jM1(eff1(1), a_1, ref_1);
}