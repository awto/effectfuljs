import * as M from '@effectful/core';

function a() {
  var a = M.context();
  return M.scope(a_1, a_4);
}

function a_1(a) {
  return M.chain(test(1), a_2, a_4);
}

function a_2(a, b) {
  if (b) {
    return M.chain(eff(3), a_3, a_4);
  } else {
    return M.chain(eff(5), a_3, a_4);
  }
}

function a_3(a) {
  return M.pure();
}

function a_4(a, e) {
  return M.raise(e);
}