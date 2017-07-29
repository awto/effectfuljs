function a_1(a_v) {
  return M.jM(eff1(a_v.i), a_2, a_v);
}

function a_2(a_v) {
  a_v.k = 10;
  return M.jM(eff2(), a_3, a_v);
}

function a_3(a_v) {
  return M.jRM(eff4(a_v.k, a_v.j), a_3, a_v);
}

function a_4() {
  var a_v;
  a_v.i = 20, a_v.j = 30, a_v.k = 40;
  return M.jRM(eff5(), a_4);
}

function a() {
  var a_v = {
    i: undefined,
    j: undefined,
    k: undefined
  };
  a_v.i = 0;
  a_v.j = 0;
  a_v.k = 0;
  return M.jM(eff(a_v.i, a_v.j, a_v.k), a_1, a_v);
}