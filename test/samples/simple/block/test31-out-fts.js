function a() {
  var i,
      a_v = {
    j: undefined
  },
      b = function b(i, k) {
    var z,
        b_v = {
      b: undefined
    },
        _a_v = a_v;
    z = 0;
    return M.j(eff2(i, _a_v.j, k, z), b_1, i, k, z, _a_v);
  };

  i = 0;
  a_v.j = 0;
  return M.j(eff1(i, a_v.j), a_1, i, a_v);
}

function b_1(i, k, z, _a_v) {
  i++, _a_v.j++, k++, z++;
  return M.j(eff3(i, _a_v.j, k, z), b_2, i, k, z, _a_v);
}

function b_2(i, k, z, _a_v) {
  return M.j(eff4(i, _a_v.j, k, z), b_3);
}

function b_3() {
  return M.pure();
}

function a_1(i, a_v) {
  i++, a_v.j++;
  return M.j(b(i, a_v.j), a_2, i, a_v);
}

function a_2(i, a_v) {
  i++, a_v.j++;
  return M.j(eff5(i, a_v.j), a_3, i, a_v);
}

function a_3(i, a_v) {
  return M.j(eff6(i, a_v.j), a_4);
}

function a_4() {
  return M.pure();
}