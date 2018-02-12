import * as M from '@effectful/core';

function a() {
  eff(1);
  eff(2);
  return eff(3);
}

function b() {
  var b = M.context();
  return M.scope(b_1);
}

function b_1(b) {
  eff(1);
  return M.chain(eff(2), b_2);
}

function b_2(b) {
  eff(3);
  return M.chain(eff(4), b_3);
}

function b_3(b) {
  return 5;
}