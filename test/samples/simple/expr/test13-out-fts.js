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
  return M.jB(b(c), a_4, a);
}

function a_4(b, a) {
  return M.j(a(b), a_5);
}

function a_5() {
  return M.pure();
}