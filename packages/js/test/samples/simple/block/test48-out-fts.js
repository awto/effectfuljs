function a() {
  var a = M.context();
  a._i = 0;
  return M.chain(eff(1), a_1, a_2);
}

function a_1(a) {
  return M.pure();
}

function a_2(a, e) {
  return M.raise(e);
}