function a() {
  var a = M.context();
  return M.scope(a_1, a_4);
}

function a_1(a) {
  return M.chain(effb(2), a_2, a_4);
}

function a_2(a, b) {
  return M.chain(eff(b), a_3, a_4);
}

function a_3(a, b) {
  b + 2;
  return M.pure();
}

function a_4(a, e) {
  return M.raise(e);
}