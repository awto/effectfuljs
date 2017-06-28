function a_1() {
  console.log('fin');
  return M.pure();
}

function a() {
  return M.jM(eff(1), a_1);
}