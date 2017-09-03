function a() {
  return M.j(eff(1), a_1, a_2);
}

function a_1(cb) {
  console.log('fin');
  return cb();
}

function a_2() {
  return M.pure();
}