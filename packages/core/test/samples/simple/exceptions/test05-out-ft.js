import * as M from '@effectful/core';

function a() {
  var a = M.context();
  return M.scope(a_1, a_7);
}

function a_1(a) {
  a._fc = a_4, a._fe = a_5;
  return M.chain(eff(1), a_3);
}

function a_2(a) {
  a._e = a._ex;
  console.log(a._e);
  a._fc = a_4, a._fe = a_5;
  return M.jump(void 0, a_3);
}

function a_3(a) {
  console.log('fin');
  return M.jump(void 0, a._fc, a._fe);
}

function a_4(a) {}

function a_5(a, e) {
  return M.raise(e);
}

function a_6(a) {
  return M.raise(a._err1);
}

function a_7(a, b) {
  a._ex = b;
  return M.jump(void 0, a_2, a_8);
}

function a_8(a, b) {
  a._fc = a_6, a._fe = a_5, a._err1 = b;
  return M.jump(void 0, a_3);
}