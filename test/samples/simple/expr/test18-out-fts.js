function a_1(a) {
  var b;
  console.log(a, 3);
  console.log('2');
  b = console.log('3');
  return M.pure(b);
}

function a() {
  return M.jMB(eff('1'), a_1);
}