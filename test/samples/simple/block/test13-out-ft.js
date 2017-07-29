function a_1(a_v) {
  return M.jM(eff1(a_v.i), a_2, a_v);
}

function a_2(a_v) {
  return M.jM(eff2(a_v.i), a_3, a_v);
}

function a_3(a_v) {
  return eff3(a_v.i);
}

function a() {
  var a_v = {
    i: undefined
  };
  a_v.i = 0;
  if (t) return a_1(a_v);else {
    a_v.i++;
    return a_2(a_v);
  }
}