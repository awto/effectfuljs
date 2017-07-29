function a_1(a) {
  return M.jMB(eff(2), a_2, a);
}

function a_2(b, a) {
  console.log(a + b, 2);
  return M.pure();
}

function a() {
  return M.jMB(eff(1), a_1);
}