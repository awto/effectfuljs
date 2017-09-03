function a() {
  return M.jB(eff('in body'), a_1);
}

function a_1(a) {
  if (a) return a_2();else return a_3(a_4);
}

function a_2() {
  return a_3(a_5);
}

function a_3(cb) {
  return M.j(eff('in `finally`'), cb);
}

function a_4() {
  return M.j(eff('after `finally`'), a_5);
}

function a_5() {
  return M.pure();
}