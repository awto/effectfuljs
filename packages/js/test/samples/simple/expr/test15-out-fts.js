function a() {
  return M.chain(effb(2), a_1, a_4);
}

function a_1(a) {
  return M.chain(eff(a), a_2, a_4);
}

function a_2(a) {
  return M.chain(effc(3), a_3, a_4, a);
}

function a_3(b, a) {
  5 + a + b;
  return M.pure();
}

function a_4(e) {
  return M.raise(e);
}