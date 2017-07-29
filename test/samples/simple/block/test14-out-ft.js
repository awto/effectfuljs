function a_1(a_v) {
  var a;
  a = a_v.i++;
  if (a) return a_2(a_v);else {
    return M.jM(eff2(a_v.i), a_3, a_v);
  }
}

function a_2(a_v) {
  return M.jM(eff1(a_v.i), a_3, a_v);
}

function a_3(a_v) {
  return eff(a_v.i);
}

function a() {
  var a_v = {
    i: undefined
  };
  a_v.i = 0;
  return M.jM(eff(a_v.i), a_1, a_v);
}