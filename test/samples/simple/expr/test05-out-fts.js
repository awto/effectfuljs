function a_1(a) {
  return M.jMB(eff(a), a_2);
}

function a_2(a) {
  a + 2;
  return M.pure();
}

function a() {
  return M.jMB(effb(2), a_1);
}