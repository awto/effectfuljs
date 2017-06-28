function a_1() {
  if (a1) return a_2();else return a_3();
}

function a_2() {
  return M.jM(eff2(), a_3);
}

function a_3() {
  return M.jM(eff3(), a_4);
}

function a_4() {
  if (a2) return a_5();else return a_6();
}

function a_5() {
  return M.jM(eff4(), a_6);
}

function a_6() {
  return M.jM(eff5(), a_7);
}

function a_7() {
  if (a3) {
    return M.jM(eff6(), a_8);
  }
}

function a_8() {
  return M.jM(eff7(), a_9);
}

function a_9() {
  if (a4) return a_10();else return M.pure();
}

function a_10() {
  return eff8();
}

function a() {
  return M.jM(eff1(), a_1);
}