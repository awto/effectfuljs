function a() {
  var a = M.context();
  return M.scopeH(a_1, a_4);
}

function a_1(a) {
  return M.chainBH(eff(1), a_2, a_4);
}

function a_2(a, b) {
  a._ = b;
  return M.chainBH(eff(2), a_3, a_4);
}

function a_3(a, b) {
  console.log(a._, b, 2);
  return M.pure();
}

function a_4(a, e) {
  return M.raise(e);
}