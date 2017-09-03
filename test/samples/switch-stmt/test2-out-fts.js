function a() {
  return M.jB(eff(1), a_1);
}

function a_1(a) {
  return M.jB(check(1), a_2, a);
}

function a_2(b, a) {
  return M.jB(check(2), a_3, a, b);
}

function a_3(c, a, b) {
  switch (a) {
    case b:
      return M.j(effB(1), a_4);

    case c:
      return M.j(effB(2), a_4);

    default:
      return M.j(effB(3), a_4);
  }
}

function a_4() {
  return M.pure();
}