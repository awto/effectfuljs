function a() {
  return M.chain(eff(1), a_1, a_6);
}

function a_1(a) {
  return M.chain(eff(2), a_2, a_6, a);
}

function a_2(b, a) {
  return M.chain(eff(3), a_3, a_6, a, b);
}

function a_3(c, a, b) {
  return M.chain(b(c), a_4, a_6, a);
}

function a_4(b, a) {
  return M.chain(a(b), a_5, a_6);
}

function a_5() {
  return M.pure();
}

function a_6(e) {
  return M.raise(e);
}