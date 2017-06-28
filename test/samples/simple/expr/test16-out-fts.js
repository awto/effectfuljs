function a_1(a) {
  return M.jMB1(eff(2), a_2, a);
}

function a_2(b, a) {
  return a(b + 2);
}

function a() {
  return M.jMB(eff(1), a_1);
}