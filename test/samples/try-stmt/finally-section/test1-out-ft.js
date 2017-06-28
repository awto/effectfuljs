function a_1(a) {
  if (a) return a_2(M.pure);else return a_2(a_3);
}

function a_2(cb) {
  return M.jM(eff('in `finally`'), cb);
}

function a_3() {
  return eff('after `finally`');
}

function a() {
  return M.jMB(eff('in body'), a_1);
}