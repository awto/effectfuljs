import * as M from '@effectful/core';

function a() {
  var a = M.context();
  return M.scopeH(a_1, a_5);
}

function a_1(a) {
  var b;
  a._i = 0;
  b = a._i++;
  return M.chainBH(eff5(b), a_2, a_5);
}

function a_2(a) {
  var b;

  if (ee) {
    b = a._i++;
    return M.chainBH(eff7(b), a_3, a_5);
  } else {
    return M.jumpH(a_3, a_5);
  }
}

function a_3(a) {
  return M.chainBH(eff8(a._i), a_4, a_5);
}

function a_4(a) {
  return M.pure();
}

function a_5(a, e) {
  return M.raise(e);
}