function e() {
  return M.jB(eff(1), e_1);
}

function e_1(a) {
  return M.jB(eff(2), e_2, a);
}

function e_2(b, a) {
  console.log(a + b);
  return M.pure();
}