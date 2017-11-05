function a() {
  var a = M.context();
  return M.jump(a_1, a_5);
}

function a_1(a) {
  return M.chain(eff(1), a_3, a_4);
}

function a_2(a) {
  a._e = a._ex;
  console.log(a._e);
  return M.pure();
}

function a_3(a) {
  return M.pure();
}

function a_4(a, e) {
  return M.raise(e);
}

function a_5(a, b) {
  a._ex = b;
  return M.jump(a_2, a_4);
}