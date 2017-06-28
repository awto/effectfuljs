function e_1(a) {
  return M.jMB1(eff(2), e_2, a);
}

function e_2(b, a) {
  console.log(a + b);
  return M.pure();
}

function e() {
  return M.jMB(eff(1), e_1);
}