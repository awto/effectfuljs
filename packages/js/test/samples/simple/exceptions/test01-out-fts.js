function a() {
  return M.chain(eff(1), a_1, a_2);
}

function a_1(a) {
  throw a;
}

function a_2(e) {
  return M.raise(e);
}