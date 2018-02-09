function a() {
  var a = M.context();
  return M.scopeH(a_1, a_6);
}

function a_1(a) {
  return M.chainBH(eff(1), a_4, a_5);
}

function a_2(a) {
  a._e = a._ex;
  console.log(a._e, 1);
  return M.chainBH(eff(2), a_3, a_5);
}

function a_3(a) {
  console.log(a._e, 2);
  return M.pure();
}

function a_4(a) {
  return M.pure();
}

function a_5(a, e) {
  return M.raise(e);
}

function a_6(a, b) {
  a._ex = b;
  return M.jumpH(a_2, a_5);
}