function M() {
  var M = M.context();
  return M.scopeH(M_1, M_3);
}

function M_1(M) {
  return M.chainBH(eff(2), M_2, M_3);
}

function M_2(M) {
  return M.pure();
}

function M_3(M, e) {
  return M.raise(e);
}