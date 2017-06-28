function a_1() {
  return M.jM(eff2(), a_2);
}

function a_2() {
  return M.jMB(eff(3), a_3);
}

function a_3(a) {
  if (a) return a_4();else {
    return eff7();
  }
}

function a_4() {
  return M.jM(eff5(), a_5);
}

function a_5() {
  return M.jM(eff6(), a_6);
}

function a_6() {
  return M.jMR(eff4(), a_2);
}

function a() {
  return M.jM(eff1(), a_1);
}