function a() {
  return M.jB(eff(1), a_1);
}

function a_1(a) {
  if (a) return a_2();else {
    return M.jB(eff(3), a_4);
  }
}

function a_2() {
  return M.jB(eff(2), a_3);
}

function a_3(a) {
  return M.pure(a);
}

function a_4(a) {
  return M.pure(a);
}

function a_5() {
  return M.pure();
}