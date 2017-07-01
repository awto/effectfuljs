function a_1(a_v) {
  return M.jM1(eff1(a_v.i++), a_2, a_v);
}

function a_2(a_v) {
  return eff2(a_v.i++);
}

function a_3(a_v) {
  return eff2(a_v.i++);
}

function a() {
  var a_v;
  a_v = {
    i: undefined
  };
  if (ee) return a_1(a_v);else {
    return M.jM1(eff1(a_v.i++), a_3, a_v);
  }
}