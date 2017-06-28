function b_1() {
  eff(3);
  return M.jM(eff(4), b_2);
}

function b_2() {
  return M.pure(5);
}

function a() {
  eff(1);
  eff(2);
  return eff(3);
}

function b() {
  eff(1);
  return M.jM(eff(2), b_1);
}