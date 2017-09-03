function a() {
  return M.j(eff(1), a_1);
}

function a_1() {
  return M.jB(eff(2), a_2);
}

function a_2(a) {
  if (a) return a_3();else return a_5();
}

function a_3() {
  return M.j(eff3(), a_4);
}

function a_4() {
  return M.j(eff4(), a_5);
}

function a_5() {
  return M.pure();
}