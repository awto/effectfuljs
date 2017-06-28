function a_1(ref_2) {
  ref_2._a = 0;
  return M.jMB1(eff(2, ref_2._a), a_2, ref_2);
}

function a_2(a, ref_2) {
  ref_2.loop = M.iterator(a);
  return a_3(ref_2);
}

function a_3(ref_2) {
  if (ref_2.loop = ref_2.loop()) return a_4(ref_2);else {
    return eff(6, ref_2._a);
  }
}

function a_4(ref_2) {
  ref_2.i = ref_2.loop.value;
  return M.jM1(eff(3, ref_2._a, ref_2._a), a_5, ref_2);
}

function a_5(ref_2) {
  ref_2.j = ref_2.i + 1;
  ref_2.k = ref_2.i + 1;
  ref_2.i++;

  (function b() {
    var ref_1 = {
      ref_2: ref_2
    };
    return M.jM1(eff(4, ref_1.ref_2._a, ref_1.ref_2.j), _1, ref_1);

    function _1(ref_1) {
      ref_1.ref_2.j++;
      ref_1.ref_2._a++;
      ref_1.ref_2.i++;
      return eff(4, ref_1.ref_2._a, ref_1.ref_2.i);
    }
  });

  return M.jM1R(eff(5, ref_2._a, ref_2.i, ref_2.j), a_3, ref_2);
}

function a() {
  var ref_2 = {
    _a: undefined,
    i: undefined,
    j: undefined,
    k: undefined,
    loop: undefined
  };
  return M.jM1(eff(1), a_1, ref_2);
}