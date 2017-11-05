function a() {
  var a = M.context();
  return M.chain(eff(3), a_1, a_2);
}

function a_1(a, c) {
  var b;
  b = console.log(2 + c);
  1 + b + 4;
  return M.pure();
}

function a_2(a, e) {
  return M.raise(e);
}