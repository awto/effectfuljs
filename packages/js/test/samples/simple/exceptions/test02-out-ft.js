function a() {
  var a = M.context();
  return M.scope(a_1, a_3);
}

function a_1(a) {
  return M.chain(eff(1), a_2, a_3);
}

function a_2(a, b) {
  throw b;
}

function a_3(a, e) {
  return M.raise(e);
}