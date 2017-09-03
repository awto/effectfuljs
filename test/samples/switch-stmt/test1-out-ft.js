function a() {
  return M.jB(eff(), a_1);
}

function a_1(a) {
  return M.jB(effC(1), a_2, a);
}

function a_2(b, a) {
  return M.jB(effC(2), a_3, a, b);
}

function a_3(c, a, b) {
  switch (a) {
    case b:
      return M.j(effR(1), a_4);

    case c:
      return a_4();

    default:
      return a_5();
  }
}

function a_4() {
  return M.j(effR(2), a_5);
}

function a_5() {
  return M.j(effR('default'), a_6);
}

function a_6() {
  return M.pure();
}