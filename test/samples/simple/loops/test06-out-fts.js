function a() {
  return M.j(eff1(), a_1);
}

function a_1() {
  return M.jB(eff2(), a_2);
}

function a_2(i) {
  return a_3(i);
}

function a_3(i) {
  return M.jB(eff(3), a_4, i);
}

function a_4(a, i) {
  if (i !== a) return a_5(i);else {
    return M.j(eff7(i), a_9);
  }
}

function a_5(i) {
  return M.j(eff5(i), a_6, i);
}

function a_6(i) {
  return M.j(eff6(i), a_7, i);
}

function a_7(i) {
  return M.jB(eff4(i), a_8);
}

function a_8(i) {
  return M.jR(a_3, i);
}

function a_9() {
  return M.pure();
}