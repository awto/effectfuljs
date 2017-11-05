function a() {
  return M.chain(eff(1), a_1, a_3);
}

function a_1(b) {
  var a;
  a = console.log(b, 2);
  return M.chain(eff(2), a_2, a_3, a);
}

function a_2(b, a) {
  a + b * 2;
  return M.pure();
}

function a_3(e) {
  return M.raise(e);
}