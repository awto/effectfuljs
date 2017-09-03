function a() {
  var k,
      b = function b() {
    var b_v = {
      j: undefined
    },
        _a_v = a_v;
    b_v.j = _a_v.i;
    return M.j(eff(2, b_v.j), b_1, _a_v);
  },
      a_v = {
    i: undefined,
    b: b
  };

  a_v.i = 0;
  k = 0;
  return M.j(eff(1, a_v.i, k), a_1, k, a_v);
}

function b_1(_a_v) {
  return M.j(eff(3, _a_v.i), b_2);
}

function b_2() {
  return M.pure();
}

function a_1(k, a_v) {
  k++;
  return M.j(eff(4, a_v.i, k), a_2, k, a_v);
}

function a_2(k, a_v) {
  return M.j(eff(5, a_v.i, k), a_3);
}

function a_3() {
  return M.pure();
}