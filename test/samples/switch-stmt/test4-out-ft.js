function a_1(a) {
  switch (a) {
    case 1:
      return M.jM(effB(1), a_2);

    case 2:
      return a_2();

    default:
      return effB(3);
  }
}

function a_2() {
  return effB(2);
}

function a() {
  return M.jMB(eff(1), a_1);
}