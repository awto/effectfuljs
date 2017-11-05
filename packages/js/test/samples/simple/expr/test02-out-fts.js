function M() {
  return M.chain(eff(2), M_1, M_2);
}

function M_1() {
  return M.pure();
}

function M_2(e) {
  return M.raise(e);
}