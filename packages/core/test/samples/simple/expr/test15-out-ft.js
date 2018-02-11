import * as M from '@effectful/core';

function a() {
  var a = M.context();
  return M.scope(a_1, a_5);
}

function a_1(a) {
  return M.chain(effb(2), a_2, a_5);
}

function a_2(a, b) {
  return M.chain(eff(b), a_3, a_5);
}

function a_3(a, b) {
  a._ = b;
  return M.chain(effc(3), a_4, a_5);
}

function a_4(a, b) {
  5 + a._ + b;
  return M.pure();
}

function a_5(a, e) {
  return M.raise(e);
}