function a() {
  return M.chain(eff('1'), a_1, a_2);
}

function a_1(a) {
  console.log(a, 3);
  console.log('2');
  return M.pure(console.log('3'));
}

function a_2(e) {
  return M.raise(e);
}