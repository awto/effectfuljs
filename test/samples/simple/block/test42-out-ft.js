function a() {
  return M.j(eff1(), a_1);
}

function a_1() {
  return M.j(eff2(), a_2);
}

function a_2() {
  return M.j(eff3(), a_3);
}

function a_3() {
  return M.jB(eff(4), a_4);
}

function a_4(a) {
  if (a) {
    return M.j(eff(5), a_5);
  } else {
    return M.pure();
  }
}

function a_5() {
  return M.pure();
}