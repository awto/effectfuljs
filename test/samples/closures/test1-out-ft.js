function b_1(a_v) {
  return eff(3, a_v.i);
}

function a_1(a_v) {
  a_v.k++;
  return M.jM1(eff(4, a_v.i, a_v.k), a_2, a_v);
}

function a_2(a_v) {
  return eff(5, a_v.i, a_v.k);
}

function a() {
  var a_v;
  a_v = {
    i: undefined,
    k: undefined,
    b: undefined
  };

  a_v.b = function b() {
    var b_v;
    b_v = {
      j: undefined
    };
    b_v.j = a_v.i;
    return M.jM1(eff(2, b_v.j), b_1, a_v);
  };

  a_v.i = 0;
  a_v.k = 0;
  return M.jM1(eff(1, a_v.i, a_v.k), a_1, a_v);
}