import * as M from '@effectful/core';

function a() {
  var pat;
  return M.chain(eff(1), _1);

  function _1(a) {
    pat = a;
    return M.chain(check(1), _2);
  }

  function _2(a) {
    if (pat === a) {
      return M.chain(effB(1), _4);
    } else {
      return M.chain(check(2), _3);
    }
  }

  function _3(a) {
    if (pat === a) {
      return M.chain(effB(2), _4);
    } else {
      return M.chain(effB(3), _4);
    }
  }

  function _4() {}
}