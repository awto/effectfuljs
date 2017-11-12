var _M = require('@effectful/generators');

var M1 = _M.generatorFunction(M);

function M() {
  return _M.scope(_1, _4);

  function _1() {
    return _M.yld(1, _2, _4);
  }

  function _2() {
    return _M.yld(2, _3, _4);
  }

  function _3() {
    return _M.pure();
  }

  function _4(e) {
    return _M.raise(e);
  }
}