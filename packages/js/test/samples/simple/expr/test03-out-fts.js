function a() {
  return M.chain(eff(3), a_1, a_2);
}

function a_1(b) {
  var a;
  a = console.log(2 + b);
  1 + a + 4;
  return M.pure();
}

function a_2(e) {
  return M.raise(e);
}