import * as M from '@effectful/core';

function a() {
  var a = M.context();
  return M.scopeH(a_1, a_4);
}

function a_1(a) {
  a._i = 0;
  a._i++;
  return M.chainBH(eff1(a._i), a_2, a_4);
}

function a_2(a) {
  if (t) {
    return M.chainBH(eff2(a._i), a_3, a_4);
  } else {
    return M.chainBH(eff3(a._i), a_3, a_4);
  }
}

function a_3(a) {
  return M.pure();
}

function a_4(a, e) {
  return M.raise(e);
}