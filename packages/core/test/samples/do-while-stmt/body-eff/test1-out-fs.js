import * as M from '@effectful/core';

(function () {
  return M.jump(void 0, _1, _5);

  function _1() {
    return M.chain(eff(2), _2, _5);
  }

  function _2(a) {
    if (a) {
      return M.jump(void 0, _1, _5);
    } else {
      return M.chain(eff(3), _3, _5);
    }
  }

  function _3() {
    return M.chain(eff(1), _4, _5);
  }

  function _4(a) {
    if (!a) {
      return M.pure();
    } else {
      return M.jump(void 0, _1, _5);
    }
  }

  function _5(e) {
    return M.raise(e);
  }
});