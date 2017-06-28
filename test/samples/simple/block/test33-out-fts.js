function a_1() {
  return M.jMB(eff(2), a_2);
}

function a_2(a) {
  if (a) return a_3();else {
    b;
    return M.pure();
  }
}

function a_3() {
  return M.jM(eff3(), a_4);
}

function a_4() {
  return eff4();
}

function a() {
  return M.jM(eff(1), a_1);
}