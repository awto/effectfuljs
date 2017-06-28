function a_1(a) {
  return M.jMB1(effb(2), a_2, a);
}

function a_2(b, a) {
  return M.jMB1(eff(b + 4), a_3, a);
}

function a_3(b, a) {
  5 + a + b;
  return M.pure();
}

function a() {
  return M.jMB(effc(3), a_1);
}