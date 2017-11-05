function a() {
  return M.chain(eff(1), a_1, a_4);
}

function a_1(a) {
  switch (a) {
    case 1:
      return M.chain(effB(1), a_2, a_4);

    case 2:
      return M.jump(a_2, a_4);

    default:
      return M.chain(effB(3), a_3, a_4);
  }
}

function a_2() {
  return M.chain(effB(2), a_3, a_4);
}

function a_3() {
  return M.pure();
}

function a_4(e) {
  return M.raise(e);
}