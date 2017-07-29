function a_1(a_v) {
  var a;
  a = a_v.i++;
  return M.jM(eff2(a), a_2, a_v);
}

function a_2(a_v) {
  var a;
  if (a_v.i) return a_3(a_v);else {
    a = a_v.i++;
    return M.jM(eff3(a), a_4, a_v);
  }
}

function a_3(a_v) {
  a_v.i++;
  return a_4(a_v);
}

function a_4(a_v) {
  var a;
  a = a_v.i++;
  return eff4(a);
}

function a() {
  var a_v = {
    i: undefined
  };
  a_v.i = 0;
  return M.jM(eff1(a_v.i), a_1, a_v);
}