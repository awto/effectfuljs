function a_1(a) {
  1 + console.log(2 + a) + 4;
  return M.pure();
}

function a() {
  return M.jMB(eff(3), a_1);
}