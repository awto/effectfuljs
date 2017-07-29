function a_1(a_v) {
  return M.jM(eff1(a_v.i), a_2, a_v);
}

function a_2(a_v) {
  a_v.i += 1;
  return M.jM(eff2(2, a_v.j), a_3, a_v);
}

function a_3(a_v) {
  var a;
  a = a_v.i += 2;
  return M.jM(eff3(a, a_v.j), a_4, a_v);
}

function a_4(a_v) {
  return eff4(a_v.j);
}

function a() {
  var a_v = {
    i: undefined,
    j: undefined
  },
      a,
      b;
  a_v.i = 0;
  a_v.j = 0;
  a = a_v.i++;
  b = a_v.j++;
  return M.jM(eff0(a, b), a_1, a_v);
}