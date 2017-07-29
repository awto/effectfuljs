function a_1(a) {
  return M.jMB(eff(a), a_2);
}

function a_2(a) {
  return M.jMB(effc(3), a_3, a);
}

function a_3(b, a) {
  5 + a + b;
  return M.pure();
}

function a() {
  return M.jMB(effb(2), a_1);
}