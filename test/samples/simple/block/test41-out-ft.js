function a() {
  return M.j(eff1(), a_1);
}

function a_1() {
  if (a1) return a_2();else return a_3();
}

function a_2() {
  return M.j(eff2(), a_3);
}

function a_3() {
  return M.j(eff3(), a_4);
}

function a_4() {
  if (a2) return a_5();else return a_6();
}

function a_5() {
  return M.j(eff4(), a_6);
}

function a_6() {
  return M.j(eff5(), a_7);
}

function a_7() {
  if (a3) return a_8();else return a_9();
}

function a_8() {
  return M.j(eff6(), a_9);
}

function a_9() {
  return M.j(eff7(), a_10);
}

function a_10() {
  if (a4) return a_11();else return a_12();
}

function a_11() {
  return M.j(eff8(), a_12);
}

function a_12() {
  return M.pure();
}