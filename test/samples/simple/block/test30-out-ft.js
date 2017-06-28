function b_1(ref_1) {
  ref_1.i++, ref_1.ref_2.j++;
  return eff2(ref_1.i, ref_1.ref_2.j);
}

function a_1(ref_2) {
  ref_2.i++, ref_2.j--;
  return M.jM1(ref_2.b(ref_2.i), a_2, ref_2);
}

function a_2(ref_2) {
  ref_2.i--, ref_2.j++;
  return eff4(ref_2.i, ref_2.j);
}

function a() {
  var ref_2 = {
    i: undefined,
    j: undefined,
    b: undefined
  };

  ref_2.b = function b(i) {
    var ref_1 = {
      ref_2: ref_2
    };
    return M.jM1(eff1(ref_1.i, ref_1.ref_2.j), b_1, ref_1);
  };

  ref_2.i = 0;
  ref_2.j = 0;
  return M.jM1(eff3(ref_2.i, ref_2.j), a_1, ref_2);
}