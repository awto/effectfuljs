import * as M from '@effectful/core';

(function () {
  var e, ex;
  return M.jump(void 0, _1, _6);

  function _1() {
    return M.chain(eff(2), _3, _5);
  }

  function _2() {
    e = ex;
    return M.chain(eff(3), _3, _5);
  }

  function _3() {
    return M.chain(eff(4), _4, _5);
  }

  function _4() {
    return M.pure();
  }

  function _5(e) {
    return M.raise(e);
  }

  function _6(a) {
    ex = a;
    return M.jump(void 0, _2, _5);
  }
});