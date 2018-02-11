import * as M from '@effectful/core';

function a() {
  var a = M.context();
  return M.scope(a_1, a_8);
}

function a_1(a) {
  return M.chain(eff0(), a_2, a_8);
}

function a_2(a) {
  a._i = 0;
  a._i++;
  return M.chain(eff1(a._i), a_3, a_8);
}

function a_3(a) {
  if (t) {
    return M.chain(eff2(a._i), a_4, a_8);
  } else {
    t;
    return M.jump(void 0, a_5, a_8);
  }
}

function a_4(a) {
  a._i++;
  return M.chain(eff4(a._i), a_5, a_8);
}

function a_5(a) {
  return M.chain(eff5(a._i), a_6, a_8);
}

function a_6(a) {
  a._i++;
  return M.chain(eff6(a._i), a_7, a_8);
}

function a_7(a) {
  return M.pure();
}

function a_8(a, e) {
  return M.raise(e);
}