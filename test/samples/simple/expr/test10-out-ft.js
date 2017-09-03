function a() {
  return M.jB(eff(1), a_1);
}

function a_1(a) {
  return M.jB(eff(2), a_2, a);
}

function a_2(b, a) {
  return M.j(effC(a, b), a_3);
}

function a_3() {
  return M.pure();
}