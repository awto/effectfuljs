function a() {
  return M.chain(eff(1), a_1, a_4);
}

function a_1(a) {
  return M.chain(eff(2), a_2, a_4, a);
}

function a_2(b, a) {
  return M.chain(a(b + 2), a_3, a_4);
}

function a_3() {
  return M.pure();
}

function a_4(e) {
  return M.raise(e);
}