function e() {
  return M.chain(eff(1), e_1, e_3);
}

function e_1(a) {
  return M.chain(eff(2), e_2, e_3, a);
}

function e_2(b, a) {
  console.log(a + b);
  return M.pure();
}

function e_3(e) {
  return M.raise(e);
}