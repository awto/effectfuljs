function a_1(a) {
  if (a) return a_2();else {
    return eff(3);
  }
}

function a_2() {
  return eff(2);
}

function a() {
  return M.jMB(eff(1), a_1);
}