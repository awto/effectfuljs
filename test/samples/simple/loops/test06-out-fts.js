function a_1() {
  return M.jMB(eff2(), a_2);
}

function a_2(i) {
  return a_3(i);
}

function a_3(i) {
  return M.jMB1(eff(3), a_4, i);
}

function a_4(a, i) {
  if (i !== a) return a_5(i);else {
    return eff7(i);
  }
}

function a_5(i) {
  return M.jM1(eff5(i), a_6, i);
}

function a_6(i) {
  return M.jM1(eff6(i), a_7, i);
}

function a_7(i) {
  return M.jMB(eff4(i), a_8);
}

function a_8(i) {
  return M.jR1(a_3, i);
}

function a() {
  return M.jM(eff1(), a_1);
}