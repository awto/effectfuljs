function a_1(a, a_v) {
  a_v.i = a;
  return M.jM1(eff2(a_v.i), a_2, a_v);
}

function a_2(a_v) {
  var a;
  a = a_v.i++;
  return M.jMB1(eff3(a), a_3, a_v);
}

function a_3(a, a_v) {
  a_v.i = a;
  return eff4(a_v.i);
}

function a() {
  var a_v, a;
  a_v = {
    i: undefined
  };
  a = a_v.i++;
  return M.jMB1(eff1(a), a_1, a_v);
}