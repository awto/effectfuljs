function a() {
  return M.jB(eff(1), a_1);
}

function a_1(a) {
  switch (a) {
    case 1:
      return M.j(effB(1), a_2);

    case 2:
      return a_2();

    default:
      return M.j(effB(3), a_3);
  }
}

function a_2() {
  return M.j(effB(2), a_3);
}

function a_3() {
  return M.pure();
}