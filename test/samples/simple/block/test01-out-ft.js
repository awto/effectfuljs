function a_1(a_v) {
  return M.jM1(eff(a_v.j++), a_2, a_v);
}

function a_2(a_v) {
  return M.jM1(eff2(a_v.j), a_3, a_v);
}

function a_3(a_v) {
  return eff3(a_v.j++);
}

function a() {
  var a_v;
  a_v = {
    j: undefined
  };
  a_v.j = 0;
  return M.jM1(eff(a_v.j), a_1, a_v);
}