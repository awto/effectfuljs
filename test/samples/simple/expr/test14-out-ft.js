function a() {
  return M.jB(eff(1), a_1);
}

function a_1(a) {
  return M.jB(eff(2), a_2, a);
}

function a_2(b, a) {
  return M.jB(eff(3), a_3, a, b);
}

function a_3(c, a, b) {
  return M.j(a(b, c, 4), a_4);
}

function a_4() {
  return M.pure();
}