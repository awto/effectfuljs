import * as M from '@effectful/core';

function a() {
  var a = M.context();
  return M.scope(a_1);
}

function a_1(a) {
  return M.chain(p1(), a_2);
}

function a_2(a) {
  return M.chain(p2(), a_3);
}

function a_3(a) {
  return M.chain(e1(), a_4);
}

function a_4(a) {
  return M.chain(e(2), a_5);
}

function a_5(a) {}