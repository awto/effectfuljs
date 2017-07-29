function a_1(a_v) {
  return M.jM(eff1(a_v.i), a_2, a_v);
}

function a_2(a_v) {
  a_v.i += 1;
  return M.jM(eff2(2), a_3, a_v);
}

function a_3(a_v) {
  var a;
  a = a_v.i += 2;
  return eff3(a);
}

function a() {
  var a_v = {
    i: undefined
  },
      a;
  a_v.i = 0;
  a = a_v.i++;
  return M.jM(eff0(a), a_1, a_v);
}