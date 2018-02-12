import * as M from '@effectful/core';

// *- without EOB exits
function b() {
  return M.chain(eff(1), _1);

  function _1(a) {
    switch (a) {
      case 1:
        return M.chain(effB(1), _2);

      case 2:
        return M.jump(void 0, _3);

      default:
        return M.chain(eff(4), _5);
    }
  }

  function _2(a) {
    if (a) {} else {
      return M.jump(void 0, _3);
    }
  }

  function _3() {
    return M.chain(effB(2), _4);
  }

  function _4(a) {
    if (a) {} else {
      return M.chain(effB(3), _5);
    }
  }

  function _5() {}
}