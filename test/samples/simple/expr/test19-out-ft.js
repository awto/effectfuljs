function a_1(a) {
  return M.jMB1(eff(2), a_2, a);
}

function a_2(b, a) {
  console.log(a, b, 3);
  return M.pure(console.log('4'));
}

function a() {
  return M.jMB(eff('1'), a_1);
}