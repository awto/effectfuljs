function a() {
  var a = M.context();
  return M.scopeH(a_1, a_3);
}

function a_1(a) {
  return M.chainBH(eff(3), a_2, a_3);
}

function a_2(a, c) {
  var b;
  b = console.log(2 + c);
  1 + b + 4;
  return M.pure();
}

function a_3(a, e) {
  return M.raise(e);
}