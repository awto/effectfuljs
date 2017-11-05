function a() {
  var a = M.context();
  return M.jump(a_1, a_7);
}

function a_1(a) {
  return M.chain(eff(1), a_3, a_5, a_4, a_5);
}

function a_2(a, ex) {
  a._e = ex;
  console.log(a._e);
  return M.jump(a_3, a_5, a_4, a_5);
}

function a_3(a, fc, fe, err) {
  var fr;
  console.log('fin');
  return M.jump(fc, fe, fr, err);
}

function a_4(a) {
  return M.pure();
}

function a_5(a, e) {
  return M.raise(e);
}

function a_6(a, err) {
  return M.raise(err);
}

function a_7(a, b) {
  return M.jump(a_2, a_8, b);
}

function a_8(a, b) {
  return M.jump(a_3, a_5, a_6, a_5, b);
}