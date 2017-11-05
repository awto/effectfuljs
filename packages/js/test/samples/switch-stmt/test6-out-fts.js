// *- without default branch
function a() {
  return M.chain(eff(1), a_1, a_3);
}

function a_1(a) {
  switch (a) {
    case 1:
      return M.chain(effB(1), a_2, a_3);

    case 2:
      return M.chain(effB(2), a_2, a_3);

    default:
      return M.pure();
  }
}

function a_2() {
  return M.pure();
}

function a_3(e) {
  return M.raise(e);
}