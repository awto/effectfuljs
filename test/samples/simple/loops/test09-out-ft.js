function a_1(a, a_v) {
  a_v.i = a;
  return a_2();
}

function a_2() {
  return M.jMB(check(), a_3);
}

function a_3(b) {
  if (b === true) {
    if (a) return a_4();else return a_5();
  } else return M.pure();
}

function a_4() {
  return M.jM(eff(1), a_5);
}

function a_5() {
  return M.jRM(upd(), a_2);
}

function a() {
  return M.jMB1(init(), a_1, a_v);
}