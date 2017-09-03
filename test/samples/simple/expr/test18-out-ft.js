function a() {
  return M.jB(eff('1'), a_1);
}

function a_1(a) {
  console.log(a, 3);
  console.log('2');
  return M.pure(console.log('3'));
}