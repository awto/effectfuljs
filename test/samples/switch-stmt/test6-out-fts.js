function a_1(a) {
  switch (a) {
    case 1:
      return effB(1);

    case 2:
      return effB(2);
  }
}

// *- without default branch
function a() {
  return M.jMB(eff(1), a_1);
}