// *- without default branch
function a() {
  var a = M.context();
  return M.chain(eff(1), a_1, a_3);
}

function a_1(a, b) {
  switch (b) {
    case 1:
      return M.chain(effB(1), a_2, a_3);

    case 2:
      return M.chain(effB(2), a_2, a_3);

    default:
      return M.pure();
  }
}

function a_2(a) {
  return M.pure();
}

function a_3(a, e) {
  return M.raise(e);
}