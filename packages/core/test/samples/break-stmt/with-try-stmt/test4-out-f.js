import * as M from '@effectful/core';

(function () {
  var e, ex;
  return M.jump(void 0, _1, _9);

  function _1() {
    return M.chain(eff(2), _2, _9);
  }

  function _2() {
    return M.chain(eff(3), _3, _9);
  }

  function _3(a) {
    if (a) {
      return M.jump(void 0, _6, _8);
    } else {
      throw new Error('error');
    }
  }

  function _4() {
    e = ex;
    return M.chain(eff(5), _5, _8);
  }

  function _5() {
    return M.chain(eff(6), _6, _8);
  }

  function _6() {
    return M.chain(eff(7), _7, _8);
  }

  function _7() {
    return M.pure();
  }

  function _8(e) {
    return M.raise(e);
  }

  function _9(a) {
    ex = a;
    return M.jump(void 0, _4, _8);
  }
});