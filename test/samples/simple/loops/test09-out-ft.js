function a_1(a, ref_1) {
  ref_1.i = a;
  return a_2(ref_1);
}

function a_2(ref_1) {
  return M.jMB1(check(), a_3, ref_1);
}

function a_3(a, ref_1) {
  if (a === true) {
    if (ref_1.ref_2.a) return a_4(ref_1);else return a_5(ref_1);
  } else return M.pure();
}

function a_4(ref_1) {
  return M.jM1(eff(1), a_5, ref_1);
}

function a_5(ref_1) {
  return M.jM1R(upd(), a_2, ref_1);
}

function a() {
  var ref_1 = {
    i: undefined,
    ref_2: ref_2
  };
  return M.jMB1(init(), a_1, ref_1);
}