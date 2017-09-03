function a() {
  var a_v = {
    i: undefined,
    j: undefined
  },
      b = function b(i, k) {
    var b_v = {
      i,
      k,
      b: undefined,
      z: undefined
    },
        _a_v = a_v;
    b_v.z = 0;
    return M.j(eff2(b_v.i, _a_v.j, b_v.k, b_v.z), b_1, b_v, _a_v);
  };

  a_v.i = 0;
  a_v.j = 0;
  return M.j(eff1(a_v.i, a_v.j), a_1, a_v);
}

function b_1(b_v, _a_v) {
  b_v.i++, _a_v.j++, b_v.k++, b_v.z++;
  return M.j(eff3(b_v.i, _a_v.j, b_v.k, b_v.z), b_2, b_v, _a_v);
}

function b_2(b_v, _a_v) {
  return M.j(eff4(b_v.i, _a_v.j, b_v.k, b_v.z), b_3);
}

function b_3() {
  return M.pure();
}

function a_1(a_v) {
  a_v.i++, a_v.j++;
  return M.j(b(a_v.i, a_v.j), a_2, a_v);
}

function a_2(a_v) {
  a_v.i++, a_v.j++;
  return M.j(eff5(a_v.i, a_v.j), a_3, a_v);
}

function a_3(a_v) {
  return M.j(eff6(a_v.i, a_v.j), a_4);
}

function a_4() {
  return M.pure();
}