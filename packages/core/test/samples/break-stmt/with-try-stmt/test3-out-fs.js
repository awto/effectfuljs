import * as M from '@effectful/core';

(function () {
  var e;
  return M.jump(void 0, _1, _5);

  function _1() {
    return M.chain(eff(2), _3);
  }

  function _2(ex) {
    e = ex;
    return M.chain(eff(3), _3);
  }

  function _3() {
    return M.chain(eff(4), _4);
  }

  function _4() {}

  function _5(a) {
    return M.jump(void 0, _2, a);
  }
});