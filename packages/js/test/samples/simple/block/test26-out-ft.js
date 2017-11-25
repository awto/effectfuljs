function a() {
  var a = M.context();
  return M.scopeH(a_1, a_6);
}

function a_1(a) {
  var b;
  b = a._i++;
  return M.chainBH(eff1(b), a_2, a_6);
}

function a_2(a, b) {
  a._i = b;
  return M.chainBH(eff2(a._i), a_3, a_6);
}

function a_3(a) {
  var b;
  b = a._i++;
  return M.chainBH(eff3(b), a_4, a_6);
}

function a_4(a, b) {
  a._i = b;
  return M.chainBH(eff4(a._i), a_5, a_6);
}

function a_5(a) {
  return M.pure();
}

function a_6(a, e) {
  return M.raise(e);
}