function a_1() {
  return M.jM(this.eff(2), a_2);
}

function a_2() {
  return eff3(this);
}

function a() {
  return M.jM(eff(1), a_1);
}