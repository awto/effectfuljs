import * as M from '@effectful/core';

function a() {
  var a = M.context();
  return M.scopeH(a_1, a_7);
}

function a_1(a) {
  return M.chainBH(init(), a_2, a_7);
}

function a_2(a, b) {
  a._i = b;
  return M.jumpH(a_3, a_7);
}

function a_3(a) {
  return M.chainBH(check(), a_4, a_7);
}

function a_4(a, b) {
  if (b === true) {
    return M.chainBH(b1(), a_5, a_7);
  } else {
    return M.pure();
  }
}

function a_5(a) {
  if (v) {
    return M.chainBH(e(), a_6, a_7);
  } else {
    return M.jumpRH(a_6, a_7);
  }
}

function a_6(a) {
  return M.chainBH(upd(), a_3, a_7);
}

function a_7(a, e) {
  return M.raise(e);
}