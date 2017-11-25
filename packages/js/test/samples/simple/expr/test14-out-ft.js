function a() {
  var a = M.context();
  return M.scopeH(a_1, a_6);
}

function a_1(a) {
  return M.chainBH(eff(1), a_2, a_6);
}

function a_2(a, b) {
  a._ = b;
  return M.chainBH(eff(2), a_3, a_6);
}

function a_3(a, b) {
  a._1 = b;
  return M.chainBH(eff(3), a_4, a_6);
}

function a_4(a, b) {
  return M.chainBH(a._(a._1, b, 4), a_5, a_6);
}

function a_5(a) {
  return M.pure();
}

function a_6(a, e) {
  return M.raise(e);
}