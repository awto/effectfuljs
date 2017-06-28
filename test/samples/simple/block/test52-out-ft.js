function a_1(ref_1) {
  ref_1.ref_2.a;
  return M.jMB1(test(1), a_2, ref_1);
}

function a_2(a, ref_1) {
  if (a) return a_3(ref_1);else {
    return M.jM1(eff(5), a_5, ref_1);
  }
}

function a_3(ref_1) {
  b;
  return M.jM1(eff(3), a_4, ref_1);
}

function a_4(ref_1) {
  c;
  return M.jM1(eff(4), a_5, ref_1);
}

function a_5(ref_1) {
  return eff(6);
}

function a() {
  var ref_1 = {
    ref_2: ref_2
  };
  return M.jM1(eff1(1), a_1, ref_1);
}