import * as M from '@effectful/core';

function a() {
  var a = M.context();
  return M.scopeH(a_1, a_8);
}

function a_1(a) {
  console.log('hi');
  return M.chainBH(e1(), a_2, a_8);
}

function a_2(a) {
  return M.chainBH(e2(), a_3, a_8);
}

function a_3(a) {
  return M.chainBH(p1(), a_4, a_8);
}

function a_4(a) {
  console.profile('minimal');
  return M.chainBH(p2(), a_5, a_8);
}

function a_5(a) {
  console.profileEnd();
  return M.chainBH(e1(), a_6, a_8);
}

function a_6(a) {
  return M.chainBH(e(2), a_7, a_8);
}

function a_7(a) {
  return M.pure();
}

function a_8(a, e) {
  return M.raise(e);
}