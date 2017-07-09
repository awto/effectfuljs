function a_1(i, a) {
  return a_2(a);
}

function a_2(a) {
  return M.jMB1(check(), a_3, a);
}

function a_3(b, a) {
  if (b === true) {
    if (a) return a_4(a);else return a_5(a);
  } else return M.pure();
}

function a_4(a) {
  return M.jM1(eff(1), a_5, a);
}

function a_5(a) {
  return M.jRM1(upd(), a_2, a);
}

function a() {
  return M.jMB1(init(), a_1, a);
}