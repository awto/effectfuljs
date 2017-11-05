function a() {
  return M.chain(effb(2), a_1, a_3);
}

function a_1(a) {
  return M.chain(eff(a), a_2, a_3);
}

function a_2(a) {
  a + 2;
  return M.pure();
}

function a_3(e) {
  return M.raise(e);
}