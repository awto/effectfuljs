var M = require('@effectful/generators');

var _a = M.generatorFunction(a);

function a() {
  return M.scopeH(_1, _4);

  function _1() {
    return M.yldBH(1, _2, _4);
  }

  function _2() {
    return M.yldBH(2, _3, _4);
  }

  function _3() {
    return M.pure();
  }

  function _4(e) {
    return M.raise(e);
  }
}