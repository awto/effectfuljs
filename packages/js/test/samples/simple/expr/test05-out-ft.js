function a() {
  var a = M.context();
  return M.chain(effb(2), a_1, a_3);
}

function a_1(a, b) {
  return M.chain(eff(b), a_2, a_3);
}

function a_2(a, b) {
  b + 2;
  return M.pure();
}

function a_3(a, e) {
  return M.raise(e);
}