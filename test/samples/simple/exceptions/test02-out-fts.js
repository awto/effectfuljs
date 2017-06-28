function a_1(a) {
  return M.jM(M.throw(a), a_2);
}

function a_2() {
  return eff(2);
}

function a() {
  return M.jMB(eff(1), a_1);
}