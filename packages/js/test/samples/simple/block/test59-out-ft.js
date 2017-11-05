function a() {
  var a = M.context();
  a._i = 0;
  return M.chain(read1(), a_1, a_4);
}

function a_1(a, b) {
  a._i = b;
  return M.chain(eff(a._i), a_2, a_4);
}

function a_2(a) {
  return M.chain(write(a._i), a_3, a_4);
}

function a_3(a) {
  return M.pure();
}

function a_4(a, e) {
  return M.raise(e);
}