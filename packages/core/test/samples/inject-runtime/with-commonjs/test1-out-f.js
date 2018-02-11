var Z = require('@effectful/generators');

var _a = Z.generatorFunction(a);

function a() {
  return Z.scope(_1, _4);

  function _1() {
    return Z.yld(1, _2, _4);
  }

  function _2() {
    return Z.yld(2, _3, _4);
  }

  function _3() {
    return Z.pure();
  }

  function _4(e) {
    return Z.raise(e);
  }
}