function a_1() {
  return M.jM(eff2(), a_2);
}

function a_2() {
  return M.jM(eff3(), a_3);
}

function a_3() {
  return M.jMB(eff(4), a_4);
}

function a_4(a) {
  if (a) {
    return eff(5);
  } else return M.pure();
}

function a() {
  return M.jM(eff1(), a_1);
}