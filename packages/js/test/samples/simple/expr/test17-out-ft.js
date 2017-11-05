function a() {
  var a = M.context();
  return M.chain(effc(3), a_1, a_4);
}

function a_1(a, b) {
  a._ = b;
  return M.chain(effb(2), a_2, a_4);
}

function a_2(a, b) {
  return M.chain(eff(b + 4), a_3, a_4);
}

function a_3(a, b) {
  5 + a._ + b;
  return M.pure();
}

function a_4(a, e) {
  return M.raise(e);
}