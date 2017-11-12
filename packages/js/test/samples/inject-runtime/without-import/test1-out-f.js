import * as M from '@effectful/generators';

var _a = M.generatorFunction(a);

function a() {
  return M.scope(_1, _4);

  function _1() {
    return M.yld(1, _2, _4);
  }

  function _2() {
    return M.yld(2, _3, _4);
  }

  function _3() {
    return M.pure();
  }

  function _4(e) {
    return M.raise(e);
  }
}