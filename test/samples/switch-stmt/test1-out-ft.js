function a_1(a) {
  return M.jMB(effC(1), a_2, a);
}

function a_2(b, a) {
  return M.jMB(effC(2), a_3, a, b);
}

function a_3(c, a, b) {
  switch (a) {
    case b:
      return M.jM(effR(1), a_4);

    case c:
      return a_4();

    default:
      return a_5();
  }
}

function a_4() {
  return M.jM(effR(2), a_5);
}

function a_5() {
  return effR('default');
}

function a() {
  return M.jMB(eff(), a_1);
}