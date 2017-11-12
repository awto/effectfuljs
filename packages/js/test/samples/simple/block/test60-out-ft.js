function a() {
  var a = M.context();
  return M.scope(a_1, a_5);
}

function a_1(a) {
  return M.chain(read1(), a_2, a_5);
}

function a_2(a, b) {
  a._i = b;
  return M.chain(eff(a._i), a_3, a_5);
}

function a_3(a) {
  return M.chain(write(a._i), a_4, a_5);
}

function a_4(a) {
  return M.pure();
}

function a_5(a, e) {
  return M.raise(e);
}