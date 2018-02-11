import * as M from '@effectful/core';

function a() {
  var i;
  return M.chain(init(), _1, _6);

  function _1(a) {
    i = a;
    return M.jump(void 0, _2, _6);
  }

  function _2() {
    return M.chain(check(), _3, _6);
  }

  function _3(a) {
    if (a === true) {
      return M.chain(b1(), _4, _6);
    } else {
      return M.pure();
    }
  }

  function _4() {
    if (v) {
      return M.chain(e(), _5, _6);
    } else {
      return M.jump(void 0, _5, _6);
    }
  }

  function _5() {
    return M.chain(upd(), _2, _6);
  }

  function _6(e) {
    return M.raise(e);
  }
}