function a() {
  var b = function b(i) {
    var b_v = {
      i
    },
        _a_v = a_v;
    return M.j(eff1(b_v.i, _a_v.j), b_1, b_v, _a_v);
  },
      a_v = {
    i: undefined,
    j: undefined,
    b: b
  };

  a_v.i = 0;
  a_v.j = 0;
  return M.j(eff3(a_v.i, a_v.j), a_1, a_v);
}

function b_1(b_v, _a_v) {
  b_v.i++, _a_v.j++;
  return M.j(eff2(b_v.i, _a_v.j), b_2);
}

function b_2() {
  return M.pure();
}

function a_1(a_v) {
  a_v.i++, a_v.j--;
  return M.j(a_v.b(a_v.i), a_2, a_v);
}

function a_2(a_v) {
  a_v.i--, a_v.j++;
  return M.j(eff4(a_v.i, a_v.j), a_3);
}

function a_3() {
  return M.pure();
}