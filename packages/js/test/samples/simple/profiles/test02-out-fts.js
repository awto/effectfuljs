function e() {
  return M.chain(eff1(), e_1, e_3);
}

function e_1() {
  return M.chain(eff2(), e_2, e_3);
}

function e_2() {
  return M.pure();
}

function e_3(e) {
  return M.raise(e);
}