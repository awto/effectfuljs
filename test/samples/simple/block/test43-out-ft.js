function a_1(ref_1) {
  if (ref_1.ref_2.a) return a_2(ref_1);else {
    return eff6();
  }
}

function a_2(ref_1) {
  return M.pure(5);
}

function a() {
  var ref_1 = {
    ref_2: ref_2
  };
  return M.jM1(eff1(), a_1, ref_1);
}