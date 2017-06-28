function b_1(ref_1) {
  return eff(3, ref_1.ref_2.i);
}

function a_1(ref_2) {
  ref_2.k++;
  return M.jM1(eff(4, ref_2.i, ref_2.k), a_2, ref_2);
}

function a_2(ref_2) {
  return eff(5, ref_2.i, ref_2.k);
}

function a() {
  var ref_2 = {
    i: undefined,
    k: undefined,
    b: undefined
  };

  ref_2.b = function b() {
    var ref_1 = {
      j: undefined,
      ref_2: ref_2
    };
    ref_1.j = ref_1.ref_2.i;
    return M.jM1(eff(2, ref_1.j), b_1, ref_1);
  };

  ref_2.i = 0;
  ref_2.k = 0;
  return M.jM1(eff(1, ref_2.i, ref_2.k), a_1, ref_2);
}