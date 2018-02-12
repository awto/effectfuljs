import * as M from '@effectful/core';

function a() {
  var _a = M.context();

  return M.scope(a_1);
}

function a_1(_a) {
  return M.chain(eff1(1), a_2);
}

function a_2(_a) {
  a;
  return M.chain(test(1), a_3);
}

function a_3(_a, a) {
  if (a) {
    b;
    return M.chain(eff(3), a_4);
  } else {
    return M.chain(eff(5), a_5);
  }
}

function a_4(_a) {
  c;
  return M.chain(eff(4), a_5);
}

function a_5(_a) {
  return M.chain(eff(6), a_6);
}

function a_6(_a) {}