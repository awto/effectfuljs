function a_1() {
  console.log(1);
  return M.jM(eff(2), a_2);
}

function a_2() {
  console.log(2);
  return M.pure();
}

function a() {
  return M.jM(eff(1), a_1);
}