function a() {
  var a = M.context();
  return M.chain(eff('1'), a_1, a_3);
}

function a_1(a, b) {
  console.log(b, 3);
  console.log('2');
  console.log('3');
  return M.chain(eff(2), a_2, a_3);
}

function a_2(a, r) {
  return M.pure(r);
}

function a_3(a, e) {
  return M.raise(e);
}