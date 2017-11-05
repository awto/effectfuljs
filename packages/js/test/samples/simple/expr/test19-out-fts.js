function a() {
  return M.chain(eff('1'), a_1, a_3);
}

function a_1(a) {
  return M.chain(eff(2), a_2, a_3, a);
}

function a_2(b, a) {
  console.log(a, b, 3);
  return M.pure(console.log('4'));
}

function a_3(e) {
  return M.raise(e);
}