function b_1(a) {
  switch (a) {
    case 1:
      return M.jMB(effB(1), b_2);

    case 2:
      return b_3();

    default:
      return eff(4);
  }
}

function b_2(a) {
  if (a) return M.pure();else return b_3();
}

function b_3() {
  return M.jMB(effB(2), b_4);
}

function b_4(a) {
  if (a) return M.pure();else {
    return effB(3);
  }
}

// *- without EOB exits
function b() {
  return M.jMB(eff(1), b_1);
}