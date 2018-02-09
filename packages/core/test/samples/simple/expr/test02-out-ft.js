import * as _M from '@effectful/core';

function M() {
  var M = _M.context();

  return _M.scopeH(M_1, M_3);
}

function M_1(M) {
  return _M.chainBH(eff(2), M_2, M_3);
}

function M_2(M) {
  return _M.pure();
}

function M_3(M, e) {
  return _M.raise(e);
}