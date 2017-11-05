function a() {
  return M.chain(eff(1), a_1, a_5);
}

function a_1(a) {
  return M.chain(eff(2), a_2, a_5, a);
}

function a_2(b, a) {
  return M.chain(eff(3), a_3, a_5, a, b);
}

function a_3(c, a, b) {
  return M.chain(a(b, c, 4), a_4, a_5);
}

function a_4() {
  return M.pure();
}

function a_5(e) {
  return M.raise(e);
}