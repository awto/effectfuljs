function a() {
  return M.jump(a_1, a_6);
}

function a_1() {
  return M.chain(eff(1), a_2, a_4, a_3, a_4);
}

function a_2(fc, fe, err) {
  var fr;
  console.log('fin');
  return M.jump(fc, fe, fr, err);
}

function a_3() {
  return M.pure();
}

function a_4(e) {
  return M.raise(e);
}

function a_5(err) {
  return M.raise(err);
}

function a_6(a) {
  return M.jump(a_2, a_4, a_5, a_4, a);
}