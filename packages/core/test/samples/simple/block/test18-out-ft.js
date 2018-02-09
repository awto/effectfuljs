function a() {
  var a = M.context();
  return M.scopeH(a_1, a_6);
}

function a_1(a) {
  var b;
  a._i = 0;
  b = a._i++;
  return M.chainBH(eff0(b), a_2, a_6);
}

function a_2(a) {
  return M.chainBH(eff1(a._i), a_3, a_6);
}

function a_3(a) {
  a._i += 1;
  return M.chainBH(eff2(2), a_4, a_6);
}

function a_4(a) {
  var b;
  b = a._i += 2;
  return M.chainBH(eff3(b), a_5, a_6);
}

function a_5(a) {
  return M.pure();
}

function a_6(a, e) {
  return M.raise(e);
}