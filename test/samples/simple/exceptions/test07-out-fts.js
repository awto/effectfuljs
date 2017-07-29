function a_1(cb) {
  console.log(1);
  return M.jM(eff(2), a_2, cb);
}

function a_2(cb) {
  console.log(2);
  return M.pure();
}

function a() {
  return M.jM(eff(1), a_1, M.pure);
}