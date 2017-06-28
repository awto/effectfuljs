function a_1(a) {
  console.log(a, 2);
  return M.pure();
}

function a() {
  return M.jMB(eff(1), a_1);
}