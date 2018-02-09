function a() {
  var a = M.context();
  return M.scopeH(a_1, a_5);
}

function a_1(a) {
  a._i = 0;
  a._j = 0;
  a._k = 0;
  return M.chainBH(eff(a._i, a._j, a._k), a_2, a_5);
}

function a_2(a) {
  return M.chainBH(eff1(a._i), a_3, a_5);
}

function a_3(a) {
  a._k = 10;
  return M.chainBH(eff2(), a_4, a_5);
}

function a_4(a) {
  return M.chainBH(eff4(a._k, a._j), a_4, a_5);
}

function a_5(a, e) {
  return M.raise(e);
}