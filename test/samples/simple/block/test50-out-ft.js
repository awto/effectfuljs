function a_1(a) {
  if (a) return a_2();else {
    return eff(5);
  }
}

function a_2() {
  return eff(3);
}

function a() {
  return M.jMB(test(1), a_1);
}