function a_1(a_v) {
  return M.jM1(eff1(a_v.i), a_2, a_v);
}

function a_2(a_v) {
  a_v.i += 1;
  return M.jM1(eff2(2), a_3, a_v);
}

function a_3(a_v) {
  return eff3(a_v.i += 2);
}

function a() {
  var a_v;
  a_v = {
    i: undefined
  };
  a_v.i = 0;
  return M.jM1(eff0(a_v.i++), a_1, a_v);
}