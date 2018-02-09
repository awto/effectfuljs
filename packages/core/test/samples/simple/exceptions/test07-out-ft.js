import * as M from '@effectful/core';

function a() {
  var a = M.context();
  return M.scopeH(a_1, a_7);
}

function a_1(a) {
  a._fc = a_4, a._fe = a_5;
  return M.chainBH(eff(1), a_2, a_5);
}

function a_2(a) {
  console.log(1);
  return M.chainBH(eff(2), a_3, a_5);
}

function a_3(a) {
  console.log(2);
  return M.jumpH(a._fc, a._fe);
}

function a_4(a) {
  return M.pure();
}

function a_5(a, e) {
  return M.raise(e);
}

function a_6(a) {
  return M.raise(a._err1);
}

function a_7(a, b) {
  a._fc = a_6, a._fe = a_5, a._err1 = b;
  return M.jumpH(a_2, a_5);
}