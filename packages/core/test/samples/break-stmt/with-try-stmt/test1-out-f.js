import * as M from '@effectful/core';

(function () {
  var e, ex;
  return M.jump(void 0, _1, _8);

  function _1() {
    return M.chain(eff(1), _2, _8);
  }

  function _2(a) {
    if (a) {
      return M.chain(eff('before break'), _5, _7);
    } else {
      return M.chain(eff(2), _4, _7);
    }
  }

  function _3() {
    e = ex;
    return M.chain(eff(3), _4, _7);
  }

  function _4() {
    return M.chain(eff(4), _5, _7);
  }

  function _5() {
    return M.chain(eff(5), _6, _7);
  }

  function _6() {
    return M.pure();
  }

  function _7(e) {
    return M.raise(e);
  }

  function _8(a) {
    ex = a;
    return M.jump(void 0, _3, _7);
  }
});