function a_1(a) {
  return M.jMB(eff(2), a_2, a);
}

function a_2(b, a) {
  var c;
  console.log(a, b, 3);
  c = console.log('4');
  return M.pure(c);
}

function a() {
  return M.jMB(eff('1'), a_1);
}