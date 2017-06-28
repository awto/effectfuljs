function a_1(ref_2) {
  ref_2.i++, ref_2.j++;
  return M.jM1(function b(i, k) {
    var ref_1 = {
      z: undefined,
      ref_2: ref_2
    };
    ref_1.z = 0;
    return M.jM1(eff2(ref_1.i, ref_1.ref_2.j, ref_1.k, ref_1.z), _1, ref_1);

    function _1(ref_1) {
      ref_1.i++, ref_1.ref_2.j++, ref_1.k++, ref_1.z++;
      return M.jM1(eff3(ref_1.i, ref_1.ref_2.j, ref_1.k, ref_1.z), _2, ref_1);
    }

    function _2(ref_1) {
      return eff4(ref_1.i, ref_1.ref_2.j, ref_1.k, ref_1.z);
    }
  }(ref_2.i, ref_2.j), a_2, ref_2);
}

function a_2(ref_2) {
  ref_2.i++, ref_2.j++;
  return M.jM1(eff5(ref_2.i, ref_2.j), a_3, ref_2);
}

function a_3(ref_2) {
  return eff6(ref_2.i, ref_2.j);
}

function a() {
  var ref_2 = {
    i: undefined,
    j: undefined
  };
  ref_2.i = 0;
  ref_2.j = 0;
  return M.jM1(eff1(ref_2.i, ref_2.j), a_1, ref_2);
}