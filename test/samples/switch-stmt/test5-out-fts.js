// *- without EOB exits
function b() {
  return M.jB(eff(1), b_1);
}

function b_1(a) {
  switch (a) {
    case 1:
      return M.jB(effB(1), b_2);

    case 2:
      return b_3();

    default:
      return M.j(eff(4), b_5);
  }
}

function b_2(a) {
  if (a) return b_5();else return b_3();
}

function b_3() {
  return M.jB(effB(2), b_4);
}

function b_4(a) {
  if (a) return b_5();else {
    return M.j(effB(3), b_5);
  }
}

function b_5() {
  return M.pure();
}