import * as M from '@effectful/core';

function a() {
  var a = M.context();
  return M.scopeH(a_1, a_9);
}

function a_1(a) {
  a._k = 0;
  return M.chainBH(eff1(), a_2, a_9);
}

function a_2(a) {
  return M.chainBH(eff2(), a_3, a_9);
}

function a_3(a, b) {
  a._i = b;
  return M.jumpH(a_4, a_9);
}

function a_4(a) {
  if (a._i < 10) {
    a._k++;
    return M.chainBH(eff3(a._i), a_5, a_9);
  } else {
    return M.chainBH(eff6(a._i, a._j, a._k), a_8, a_9);
  }
}

function a_5(a, b) {
  a._j = b;
  return M.chainBH(eff4(a._i), a_6, a_9);
}

function a_6(a, b) {
  var c;
  a._l = b;
  a._l++;
  c = a._j++;
  return M.chainBH(eff5(c, a._k, a._l), a_7, a_9);
}

function a_7(a) {
  a._i++;
  return M.jumpRH(a_4, a_9);
}

function a_8(a) {
  return M.pure();
}

function a_9(a, e) {
  return M.raise(e);
}