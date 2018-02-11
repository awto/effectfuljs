import * as M from '@effectful/core';

function a() {
  var a = M.context();
  return M.scope(a_1, a_8);
}

function a_1(a) {
  return M.chain(eff1(), a_2, a_8);
}

function a_2(a) {
  return M.chain(eff2(), a_3, a_8);
}

function a_3(a) {
  return M.chain(eff(3), a_4, a_8);
}

function a_4(a, b) {
  if (b) {
    return M.chain(eff5(), a_5, a_8);
  } else {
    return M.chain(eff7(), a_7, a_8);
  }
}

function a_5(a) {
  return M.chain(eff6(), a_6, a_8);
}

function a_6(a) {
  return M.chain(eff4(), a_3, a_8);
}

function a_7(a) {
  return M.pure();
}

function a_8(a, e) {
  return M.raise(e);
}