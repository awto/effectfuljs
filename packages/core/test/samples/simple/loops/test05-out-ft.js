import * as M from '@effectful/core';

function a() {
  var a = M.context();
  return M.scopeH(a_1, a_8);
}

function a_1(a) {
  return M.chainBH(eff1(), a_2, a_8);
}

function a_2(a) {
  return M.chainBH(eff2(), a_3, a_8);
}

function a_3(a) {
  return M.chainBH(eff(3), a_4, a_8);
}

function a_4(a, b) {
  if (b) {
    return M.chainBH(eff5(), a_5, a_8);
  } else {
    return M.chainBH(eff7(), a_7, a_8);
  }
}

function a_5(a) {
  return M.chainBH(eff6(), a_6, a_8);
}

function a_6(a) {
  return M.chainBH(eff4(), a_3, a_8);
}

function a_7(a) {
  return M.pure();
}

function a_8(a, e) {
  return M.raise(e);
}