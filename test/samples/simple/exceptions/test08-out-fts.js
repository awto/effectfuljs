function a_1(cb) {
  console.log('fin');
  return M.pure();
}

function a() {
  return M.jM(eff(1), a_1, M.pure);
}