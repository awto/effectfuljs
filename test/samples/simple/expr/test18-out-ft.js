function a_1(a) {
  console.log(a, 3);
  console.log('2');
  return M.pure(console.log('3'));
}

function a() {
  return M.jMB(eff('1'), a_1);
}