function a_1(a_v) {
  if (t) return a_2(a_v);else {
    return eff3(a_v.i);
  }
}

function a_2(a_v) {
  return eff2(a_v.i);
}

function a() {
  var a_v = {
    i: undefined
  };
  a_v.i = 0;
  a_v.i++;
  return M.jM(eff1(a_v.i), a_1, a_v);
}