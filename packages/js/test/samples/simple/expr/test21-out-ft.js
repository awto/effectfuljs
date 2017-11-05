function a() {
  var a = M.context();
  a.__this = this;
  return M.chain(eff(1), a_1, a_4);
}

function a_1(a) {
  return M.chain(a.__this.eff(2), a_2, a_4);
}

function a_2(a) {
  return M.chain(eff3(a.__this), a_3, a_4);
}

function a_3(a) {
  return M.pure();
}

function a_4(a, e) {
  return M.raise(e);
}