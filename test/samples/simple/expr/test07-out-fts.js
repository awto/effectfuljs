function a() {
  return M.jB(eff(1), a_1);
}

function a_1(b) {
  var a;
  a = console.log(b, 2);
  return M.jB(eff(2), a_2, a);
}

function a_2(b, a) {
  a + b * 2;
  return M.pure();
}