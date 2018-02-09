function a() {
  var a = M.context();
  return M.scopeH(a_1, a_5);
}

function a_1(a) {
  return M.chainBH(effc(3), a_2, a_5);
}

function a_2(a, b) {
  a._ = b;
  return M.chainBH(effb(2), a_3, a_5);
}

function a_3(a, b) {
  return M.chainBH(eff(b + 4), a_4, a_5);
}

function a_4(a, b) {
  5 + a._ + b;
  return M.pure();
}

function a_5(a, e) {
  return M.raise(e);
}