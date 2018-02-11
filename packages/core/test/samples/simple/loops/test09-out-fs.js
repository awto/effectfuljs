import * as M from '@effectful/core';

function a() {
  var i;
  return M.chain(init(), _1, _5);

  function _1(a) {
    i = a;
    return M.jump(void 0, _2, _5);
  }

  function _2() {
    return M.chain(check(), _3, _5);
  }

  function _3(b) {
    if (b === true) {
      if (a) {
        return M.chain(eff(1), _4, _5);
      } else {
        return M.jump(void 0, _4, _5);
      }
    } else {
      return M.pure();
    }
  }

  function _4() {
    return M.chain(upd(), _2, _5);
  }

  function _5(e) {
    return M.raise(e);
  }
}