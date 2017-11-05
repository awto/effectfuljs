function a() {
  return M.jump(a_1, a_7);
}

function a_1() {
  return M.chain(eff(1), a_2, a_5, a_4, a_5);
}

function a_2(fc, fe, err) {
  console.log(1);
  return M.chain(eff(2), a_3, a_5, fc, fe, err);
}

function a_3(fc, fe, err) {
  var fr;
  console.log(2);
  return M.jump(fc, fe, fr, err);
}

function a_4() {
  return M.pure();
}

function a_5(e) {
  return M.raise(e);
}

function a_6(err) {
  return M.raise(err);
}

function a_7(a) {
  return M.jump(a_2, a_5, a_6, a_5, a);
}