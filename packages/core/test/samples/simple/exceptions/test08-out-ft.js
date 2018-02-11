import * as M from '@effectful/core';

function a() {
  var a = M.context();
  return M.scope(a_1, a_6);
}

function a_1(a) {
  a._fc = a_3, a._fe = a_4;
  return M.chain(eff(1), a_2, a_4);
}

function a_2(a) {
  console.log('fin');
  return M.jump(void 0, a._fc, a._fe);
}

function a_3(a) {
  return M.pure();
}

function a_4(a, e) {
  return M.raise(e);
}

function a_5(a) {
  return M.raise(a._err1);
}

function a_6(a, b) {
  a._fc = a_5, a._fe = a_4, a._err1 = b;
  return M.jump(void 0, a_2, a_4);
}