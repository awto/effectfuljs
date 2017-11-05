var _M = require('@effectful/generators');

var M1 = _M.generatorFunction(M);

function M() {
  return _M.scope(M_1, M_5, M_4);
}

function M_1() {
  return _M.yld(1, M_2, M_5, M_4);
}

function M_2() {
  return _M.yld(2, M_3, M_5, M_4);
}

function M_3() {
  return _M.pure();
}

function M_4(r) {
  return _M.pure(r);
}

function M_5(e) {
  return _M.raise(e);
}