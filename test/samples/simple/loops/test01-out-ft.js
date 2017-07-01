function a_1(a_v) {
  return M.jMB1(eff2(), a_2, a_v);
}

function a_2(a, a_v) {
  a_v.i = a;
  return a_3(a_v);
}

function a_3(a_v) {
  if (a_v.i < 10) return a_4(a_v);else {
    return M.jMB(eff7(a_v.i), a_7);
  }
}

function a_4(a_v) {
  return M.jMB1(eff3(a_v.i), a_5, a_v);
}

function a_5(a, a_v) {
  a_v.j = a;
  return M.jM1(eff4(a_v.j++), a_6, a_v);
}

function a_6(a_v) {
  a_v.i++;
  return M.jNR(a_3, a_v);
}

function a_7(a) {
  console.log(a);
  return M.pure();
}

// *- should inject forPar
function a() {
  return M.jM1(eff1(), a_1, a_v);
}