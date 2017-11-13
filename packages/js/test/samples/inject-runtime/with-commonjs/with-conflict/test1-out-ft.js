var _M = require('@effectful/generators');

function M() {
  var M = _M.generator();

  return _M.scope(M_1, M_4);
}

function M_1(M) {
  return _M.yld(1, M_2, M_4);
}

function M_2(M) {
  return _M.yld(2, M_3, M_4);
}

function M_3(M) {
  return _M.pure();
}

function M_4(M, e) {
  return _M.raise(e);
}