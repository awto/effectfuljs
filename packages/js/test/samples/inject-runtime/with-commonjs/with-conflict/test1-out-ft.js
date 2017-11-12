var _M = require('@effectful/generators');

var M1 = _M.generatorFunction(M);

function M() {
  var M = _M.generator(M1);

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