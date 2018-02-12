import * as M from '@effectful/core';

function a() {
  var a = M.context();
  a.__this = this;
  return M.scope(a_1);
}

function a_1(a) {
  return M.chain(eff(1), a_2);
}

function a_2(a) {
  return M.chain(a.__this.eff(2), a_3);
}

function a_3(a) {
  return M.chain(eff3(a.__this), a_4);
}

function a_4(a) {}