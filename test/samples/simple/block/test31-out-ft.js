function b_1(b_v, a_v) {
  b_v.i++, a_v.j++, b_v.k++, b_v.z++;
  return M.jM(eff3(b_v.i, a_v.j, b_v.k, b_v.z), b_2, b_v, a_v);
}

function b_2(b_v, a_v) {
  return eff4(b_v.i, a_v.j, b_v.k, b_v.z);
}

function a_1(a_v) {
  var b_v;
  a_v.i++, a_v.j++;
  return M.jM(function b(i, k) {
    var b_v = {
      i,
      k,
      b: undefined,
      z: undefined
    },
        a_v;
    b_v.z = 0;
    return M.jM(eff2(b_v.i, a_v.j, b_v.k, b_v.z), b_1, b_v, a_v);
  }(a_v.i, a_v.j), a_2, a_v);
}

function a_2(a_v) {
  a_v.i++, a_v.j++;
  return M.jM(eff5(a_v.i, a_v.j), a_3, a_v);
}

function a_3(a_v) {
  return eff6(a_v.i, a_v.j);
}

function a() {
  var a_v = {
    i: undefined,
    j: undefined
  };
  a_v.i = 0;
  a_v.j = 0;
  return M.jM(eff1(a_v.i, a_v.j), a_1, a_v);
}