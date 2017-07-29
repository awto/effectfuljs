function a_1(a) {
  return M.jMB(check(1), a_2, a);
}

function a_2(b, a) {
  return M.jMB(check(2), a_3, a, b);
}

function a_3(c, a, b) {
  switch (a) {
    case b:
      return effB(1);

    case c:
      return effB(2);

    default:
      return effB(3);
  }
}

function a() {
  return M.jMB(eff(1), a_1);
}