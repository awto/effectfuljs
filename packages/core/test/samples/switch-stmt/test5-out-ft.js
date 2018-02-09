import * as M from '@effectful/core';

// *- without EOB exits
function b() {
  var b = M.context();
  return M.scopeH(b_1, b_7);
}

function b_1(b) {
  return M.chainBH(eff(1), b_2, b_7);
}

function b_2(b, a) {
  switch (a) {
    case 1:
      return M.chainBH(effB(1), b_3, b_7);

    case 2:
      return M.jumpH(b_4, b_7);

    default:
      return M.chainBH(eff(4), b_6, b_7);
  }
}

function b_3(b, a) {
  if (a) {
    return M.pure();
  } else {
    return M.jumpH(b_4, b_7);
  }
}

function b_4(b) {
  return M.chainBH(effB(2), b_5, b_7);
}

function b_5(b, a) {
  if (a) {
    return M.pure();
  } else {
    return M.chainBH(effB(3), b_6, b_7);
  }
}

function b_6(b) {
  return M.pure();
}

function b_7(b, e) {
  return M.raise(e);
}