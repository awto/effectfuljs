function a() {
  var a = M.context();
  return M.scope(a_1, a_10);
}

function a_1(a) {
  return M.chain(eff1(), a_2, a_10);
}

function a_2(a) {
  return M.chain(eff2(), a_3, a_10);
}

function a_3(a, b) {
  a._i = b;
  return M.jump(a_4, a_10);
}

function a_4(a) {
  return M.chain(eff(3), a_5, a_10);
}

function a_5(a, b) {
  if (a._i !== b) {
    return M.chain(eff5(a._i), a_6, a_10);
  } else {
    return M.chain(eff7(a._i), a_9, a_10);
  }
}

function a_6(a) {
  return M.chain(eff6(a._i), a_7, a_10);
}

function a_7(a) {
  return M.chain(eff4(a._i), a_8, a_10);
}

function a_8(a, b) {
  a._i = b;
  return M.repeat(a_4, a_10);
}

function a_9(a) {
  return M.pure();
}

function a_10(a, e) {
  return M.raise(e);
}