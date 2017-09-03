function a() {
  var a_v = {
    i: undefined
  };
  return M.j(eff1(), a_1, a_v);
}

function a_1(a_v) {
  return M.jB(eff2(), a_2, a_v);
}

function a_2(a, a_v) {
  a_v.i = a;
  return a_3(a_v);
}

function a_3(a_v) {
  return M.jB(eff(3), a_4, a_v);
}

function a_4(a, a_v) {
  if (a_v.i !== a) return a_5(a_v);else {
    return M.j(eff7(a_v.i), a_9);
  }
}

function a_5(a_v) {
  return M.j(eff5(a_v.i), a_6, a_v);
}

function a_6(a_v) {
  return M.j(eff6(a_v.i), a_7, a_v);
}

function a_7(a_v) {
  return M.jB(eff4(a_v.i), a_8, a_v);
}

function a_8(a, a_v) {
  a_v.i = a;
  return M.jR(a_3, a_v);
}

function a_9() {
  return M.pure();
}