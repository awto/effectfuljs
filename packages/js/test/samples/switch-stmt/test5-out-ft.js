// *- without EOB exits
function b() {
  var b = M.context();
  return M.chain(eff(1), b_1, b_6);
}

function b_1(b, a) {
  switch (a) {
    case 1:
      return M.chain(effB(1), b_2, b_6);

    case 2:
      return M.jump(b_3, b_6);

    default:
      return M.chain(eff(4), b_5, b_6);
  }
}

function b_2(b, a) {
  if (a) {
    return M.pure();
  } else {
    return M.jump(b_3, b_6);
  }
}

function b_3(b) {
  return M.chain(effB(2), b_4, b_6);
}

function b_4(b, a) {
  if (a) {
    return M.pure();
  } else {
    return M.chain(effB(3), b_5, b_6);
  }
}

function b_5(b) {
  return M.pure();
}

function b_6(b, e) {
  return M.raise(e);
}