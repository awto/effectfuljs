import * as M from '@effectful/core';

function a() {
  var a = M.context();
  return M.scope(a_1, a_7);
}

function a_1(a) {
  return M.chain(eff1(), a_2, a_7);
}

function a_2(a) {
  return M.chain(eff2(), a_3, a_7);
}

function a_3(a) {
  return M.chain(eff3(), a_4, a_7);
}

function a_4(a) {
  return M.chain(eff(4), a_5, a_7);
}

function a_5(a, b) {
  if (b) {
    return M.chain(eff(5), a_6, a_7);
  } else {
    return M.pure();
  }
}

function a_6(a) {
  return M.pure();
}

function a_7(a, e) {
  return M.raise(e);
}