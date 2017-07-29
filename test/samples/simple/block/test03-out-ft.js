function a_1(a_v) {
  a_v.i = 0;
  a_v.i++;
  return M.jM(eff1(a_v.i), a_2, a_v);
}

function a_2(a_v) {
  if (t) return a_3(a_v);else {
    return eff3(a_v.i);
  }
}

function a_3(a_v) {
  return eff2(a_v.i);
}

function a() {
  var a_v = {
    i: undefined
  };
  return M.jM(eff0(), a_1, a_v);
}