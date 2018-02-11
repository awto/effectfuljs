import * as M from '@effectful/core';

function a() {
  var a = M.context();
  return M.scope(a_1, a_5);
}

function a_1(a) {
  a._i = 0;
  a._i++;
  return M.chain(eff1(a._i), a_2, a_5);
}

function a_2(a) {
  return M.chain(eff(a._i), a_3, a_5);
}

function a_3(a) {
  {
    a._i++;
  }
  return M.chain(eff2(a._i), a_4, a_5);
}

function a_4(a) {
  return M.pure();
}

function a_5(a, e) {
  return M.raise(e);
}