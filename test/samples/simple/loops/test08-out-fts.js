function a_1(i) {
  return a_2();
}

function a_2() {
  return M.jMB(check(), a_3);
}

function a_3(a) {
  if (a === true) {
    return M.jM(b1(), a_4);
  } else return M.pure();
}

function a_4() {
  if (v) return a_5();else return a_6();
}

function a_5() {
  return M.jM(e(), a_6);
}

function a_6() {
  return M.jMR(upd(), a_2);
}

function a() {
  return M.jMB(init(), a_1);
}