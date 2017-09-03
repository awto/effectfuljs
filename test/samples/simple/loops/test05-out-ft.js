function a() {
  return M.j(eff1(), a_1);
}

function a_1() {
  return M.j(eff2(), a_2);
}

function a_2() {
  return M.jB(eff(3), a_3);
}

function a_3(a) {
  if (a) return a_4();else {
    return M.j(eff7(), a_7);
  }
}

function a_4() {
  return M.j(eff5(), a_5);
}

function a_5() {
  return M.j(eff6(), a_6);
}

function a_6() {
  return M.jR(eff4(), a_2);
}

function a_7() {
  return M.pure();
}