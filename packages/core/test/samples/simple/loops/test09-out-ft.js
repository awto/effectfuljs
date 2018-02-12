import * as M from '@effectful/core';

function _a() {
  var a1 = M.context();
  return M.scope(a_1);
}

function a_1(a1) {
  return M.chain(init(), a_2);
}

function a_2(a1, a) {
  a1._i = a;
  return M.jump(void 0, a_3);
}

function a_3(a1) {
  return M.chain(check(), a_4);
}

function a_4(a1, a) {
  if (a === true) {
    if (_a) {
      return M.chain(eff(1), a_5);
    } else {
      return M.jump(void 0, a_5);
    }
  }
}

function a_5(a1) {
  return M.chain(upd(), a_3);
}