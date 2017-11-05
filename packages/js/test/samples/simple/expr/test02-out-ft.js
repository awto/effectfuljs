function M() {
  var M = M.context();
  return M.chain(eff(2), M_1, M_2);
}

function M_1(M) {
  return M.pure();
}

function M_2(M, e) {
  return M.raise(e);
}