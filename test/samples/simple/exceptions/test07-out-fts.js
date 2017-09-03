function a() {
  return M.j(eff(1), a_1, a_3);
}

function a_1(cb) {
  console.log(1);
  return M.j(eff(2), a_2, cb);
}

function a_2(cb) {
  console.log(2);
  return cb();
}

function a_3() {
  return M.pure();
}