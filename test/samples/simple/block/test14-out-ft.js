function a_1(a_v) {
  if (a_v.i++) return a_2(a_v);else {
    return M.jM1(eff2(a_v.i), a_3, a_v);
  }
}

function a_2(a_v) {
  return M.jM1(eff1(a_v.i), a_3, a_v);
}

function a_3(a_v) {
  return eff(a_v.i);
}

function a() {
  var a_v;
  a_v = {
    i: undefined
  };
  a_v.i = 0;
  return M.jM1(eff(a_v.i), a_1, a_v);
}