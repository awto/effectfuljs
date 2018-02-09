function _M() {
  var _M = M.context();

  return M.scopeH(M_1, M_3);
}

function M_1(_M) {
  return M.chainBH(eff(2), M_2, M_3);
}

function M_2(_M) {
  return M.pure();
}

function M_3(_M, e) {
  return M.raise(e);
}