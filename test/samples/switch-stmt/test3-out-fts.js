function a_1(a) {
  switch (a) {
    case 1:
      return effB(1);

    case 2:
      return effB(2);

    default:
      return effB(3);
  }
}

function a() {
  return M.jMB(eff(1), a_1);
}