import * as M from '@effectful/core';

(function () {
  return M.chain(eff(0), _1);

  function _1() {
    return M.chain(eff(1), _2);
  }

  function _2() {
    return M.chain(eff(2), _3);
  }

  function _3() {
    return M.chain(eff(3), _4);
  }

  function _4(a) {
    if (a) {
      return M.chain(eff(4), _9);
    } else {
      return M.chain(eff(3), _5);
    }
  }

  function _5(a) {
    if (a) {
      return M.chain(eff(4), _2);
    } else {
      return M.chain(eff(5), _6);
    }
  }

  function _6(a) {
    if (a) {
      return M.chain(eff(6), _1);
    } else {
      return M.chain(eff(7), _7);
    }
  }

  function _7(a) {
    if (a) {
      return M.chain(eff(8), _11);
    } else {
      return M.chain(eff(9), _8);
    }
  }

  function _8(a) {
    if (!a) {
      return M.jump(void 0, _9);
    } else {
      return M.jump(void 0, _2);
    }
  }

  function _9() {
    return M.chain(eff(10), _10);
  }

  function _10() {
    if (!true) {
      return M.jump(void 0, _11);
    } else {
      return M.jump(void 0, _1);
    }
  }

  function _11() {
    return M.chain(eff(11), _12);
  }

  function _12() {}
});