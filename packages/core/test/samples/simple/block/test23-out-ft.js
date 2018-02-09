import * as M from '@effectful/core';

function a() {
  var a = M.context();
  return M.scopeH(a_1, a_8);
}

function a_1(a) {
  a._i = 0;
  a._j = 0;
  a._ = a._i++;
  return M.chainBH(eff4(a._i, a._j), a_2, a_8);
}

function a_2(a, b) {
  var c;
  c = a._j++;
  return M.chainBH(eff3(b, c), a_3, a_8);
}

function a_3(a, b) {
  a._1 = b;
  return M.chainBH(eff5(a._i), a_4, a_8);
}

function a_4(a, b) {
  return M.chainBH(eff2(a._, a._1, b), a_5, a_8);
}

function a_5(a, b) {
  var c;
  c = a._i++;
  return M.chainBH(eff1(b, c), a_6, a_8);
}

function a_6(a, b) {
  return M.chainBH(eff0(b, a._i), a_7, a_8);
}

function a_7(a) {
  return M.pure();
}

function a_8(a, e) {
  return M.raise(e);
}