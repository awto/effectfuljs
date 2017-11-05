function a() {
  return M.jump(a_1, a_8);
}

function a_1() {
  return M.chain(eff('in body'), a_2, a_8);
}

function a_2(a) {
  if (a) {
    return M.jump(a_3, a_6, a_5, a_6);
  } else {
    return M.jump(a_3, a_6, a_4, a_6);
  }
}

function a_3(fc, fe, err) {
  var fr;
  return M.chain(eff('in `finally`'), fc, fe, fr, err);
}

function a_4() {
  return M.chain(eff('after `finally`'), a_5, a_6);
}

function a_5() {
  return M.pure();
}

function a_6(e) {
  return M.raise(e);
}

function a_7(err) {
  return M.raise(err);
}

function a_8(a) {
  return M.jump(a_3, a_6, a_7, a_6, a);
}