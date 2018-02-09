import * as M from '@effectful/core';

function a() {
  var a = M.context();
  return M.scopeH(a_1, a_6);
}

function a_1(a) {
  a._i = 0;
  return M.chainBH(eff1(a._i), a_2, a_6);
}

function a_2(a) {
  var b;
  b = a._i++;
  return M.chainBH(eff2(b), a_3, a_6);
}

function a_3(a) {
  var b;

  if (a._i) {
    a._i++;
    return M.jumpH(a_4, a_6);
  } else {
    b = a._i++;
    return M.chainBH(eff3(b), a_4, a_6);
  }
}

function a_4(a) {
  var b;
  b = a._i++;
  return M.chainBH(eff4(b), a_5, a_6);
}

function a_5(a) {
  return M.pure();
}

function a_6(a, e) {
  return M.raise(e);
}