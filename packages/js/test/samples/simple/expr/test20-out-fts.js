function a() {
  return M.chain(eff('1'), a_1, a_3);
}

function a_1(a) {
  console.log(a, 3);
  console.log('2');
  console.log('3');
  return M.chain(eff(2), a_2, a_3);
}

function a_2(r) {
  return M.pure(r);
}

function a_3(e) {
  return M.raise(e);
}