function a() {
  var a = M.context();
  a._i = 0;
  return M.chain(eff2(2), a_1, a_3);
}

function a_1(a, b) {
  return M.chain(eff1(b), a_2, a_3);
}

function a_2(a) {
  return M.pure();
}

function a_3(a, e) {
  return M.raise(e);
}