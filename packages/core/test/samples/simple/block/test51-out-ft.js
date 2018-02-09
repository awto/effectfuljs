import * as M from '@effectful/core';

function a() {
  var _a = M.context();

  return M.scopeH(a_1, a_6);
}

function a_1(_a) {
  return M.chainBH(eff1(1), a_2, a_6);
}

function a_2(_a) {
  a;

  if (test) {
    b;
    return M.chainBH(eff(3), a_3, a_6);
  } else {
    return M.chainBH(eff(5), a_4, a_6);
  }
}

function a_3(_a) {
  c;
  return M.chainBH(eff(4), a_4, a_6);
}

function a_4(_a) {
  return M.chainBH(eff(6), a_5, a_6);
}

function a_5(_a) {
  return M.pure();
}

function a_6(_a, e) {
  return M.raise(e);
}