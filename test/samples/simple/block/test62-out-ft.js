function a_1(a_v) {
  return M.jM1(eff(a_v.i++, a_v.j = 1), a_2, a_v);
}

function a_2(a_v) {
  return M.jM1(eff(a_v.j++, a_v.k++), a_3, a_v);
}

function a_3(a_v) {
  return M.jM1(eff(a_v.i), a_4, a_v);
}

function a_4(a_v) {
  return M.jM1(eff(a_v.j = 3), a_5, a_v);
}

function a_5(a_v) {
  return M.jM1(eff(a_v.j), a_6, a_v);
}

function a_6(a_v) {
  return eff(a_v.i);
}

function a(i) {
  var a_v;
  a_v = {
    i,
    j: undefined,
    k: undefined
  };
  a_v.k = 0;
  return M.jM1(eff(a_v.i), a_1, a_v);
}