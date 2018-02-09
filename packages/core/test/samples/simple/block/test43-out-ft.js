import * as M from '@effectful/core';

function a() {
  var _a = M.context();

  return M.scopeH(a_1, a_4);
}

function a_1(_a) {
  return M.chainBH(eff1(), a_2, a_4);
}

function a_2(_a) {
  if (a) {
    return M.pure(5);
  } else {
    return M.chainBH(eff6(), a_3, a_4);
  }
}

function a_3(_a) {
  return M.pure(_a._r);
}

function a_4(_a, e) {
  return M.raise(e);
}