function a() {
  return M.jB(test(1), a_1);
}

function a_1(a) {
  if (a) return a_2();else {
    return M.j(eff(5), a_3);
  }
}

function a_2() {
  return M.j(eff(3), a_3);
}

function a_3() {
  return M.pure();
}