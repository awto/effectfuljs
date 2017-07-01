function a_1(a_v) {
  return M.jM1(eff1(a_v.i++, a_v.j++), a_2, a_v);
}

function a_2(a_v) {
  return M.jM1(eff2(a_v.i), a_3, a_v);
}

function a_3(a_v) {
  a_v.i += 1;
  return M.jM1(eff3(2, a_v.j), a_4, a_v);
}

function a_4(a_v) {
  return M.jM1(eff4(a_v.i += 2, a_v.j), a_5, a_v);
}

function a_5(a_v) {
  return eff5(a_v.j);
}

function a() {
  var a_v;
  a_v = {
    i: undefined,
    j: undefined
  };
  a_v.i = 0;
  a_v.j = 0;
  return M.jM1(eff0(a_v.i, a_v.j), a_1, a_v);
}