// *- without EOB exits
function b() {
  return M.chain(eff(1), b_1, b_6);
}

function b_1(a) {
  switch (a) {
    case 1:
      return M.chain(effB(1), b_2, b_6);

    case 2:
      return M.jump(b_3, b_6);

    default:
      return M.chain(eff(4), b_5, b_6);
  }
}

function b_2(a) {
  if (a) {
    return M.pure();
  } else {
    return M.jump(b_3, b_6);
  }
}

function b_3() {
  return M.chain(effB(2), b_4, b_6);
}

function b_4(a) {
  if (a) {
    return M.pure();
  } else {
    return M.chain(effB(3), b_5, b_6);
  }
}

function b_5() {
  return M.pure();
}

function b_6(e) {
  return M.raise(e);
}