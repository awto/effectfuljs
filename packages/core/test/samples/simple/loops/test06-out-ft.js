import * as M from '@effectful/core';

function a() {
  var a = M.context();
  return M.scope(a_1);
}

function a_1(a) {
  return M.chain(eff1(), a_2);
}

function a_2(a) {
  return M.chain(eff2(), a_3);
}

function a_3(a, b) {
  a._i = b;
  return M.jump(void 0, a_4);
}

function a_4(a) {
  return M.chain(eff(3), a_5);
}

function a_5(a, b) {
  if (a._i !== b) {
    return M.chain(eff5(a._i), a_6);
  } else {
    return M.chain(eff7(a._i), a_9);
  }
}

function a_6(a) {
  return M.chain(eff6(a._i), a_7);
}

function a_7(a) {
  return M.chain(eff4(a._i), a_8);
}

function a_8(a, b) {
  a._i = b;
  return M.jump(void 0, a_4);
}

function a_9(a) {}