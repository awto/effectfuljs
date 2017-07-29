function b_1(b_v, a_v) {
  b_v.i++, a_v.j++;
  return eff2(b_v.i, a_v.j);
}

function a_1(a_v) {
  a_v.i++, a_v.j--;
  return M.jM(a_v.b(a_v.i), a_2, a_v);
}

function a_2(a_v) {
  a_v.i--, a_v.j++;
  return eff4(a_v.i, a_v.j);
}

function a() {
  var b_v,
      a_v = {
    i: undefined,
    j: undefined,
    b: undefined
  };

  a_v.b = function b(i) {
    var b_v = {
      i
    },
        a_v;
    return M.jM(eff1(b_v.i, a_v.j), b_1, b_v, a_v);
  };

  a_v.i = 0;
  a_v.j = 0;
  return M.jM(eff3(a_v.i, a_v.j), a_1, a_v);
}