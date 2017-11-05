function a() {
  var a = M.context();
  return M.chain(eff1(), a_1, a_9);
}

function a_1(a) {
  return M.chain(eff2(), a_2, a_9);
}

function a_2(a, b) {
  a._i = b;
  return M.jump(a_3, a_9);
}

function a_3(a) {
  return M.chain(eff(3), a_4, a_9);
}

function a_4(a, b) {
  if (a._i !== b) {
    return M.chain(eff5(a._i), a_5, a_9);
  } else {
    return M.chain(eff7(a._i), a_8, a_9);
  }
}

function a_5(a) {
  return M.chain(eff6(a._i), a_6, a_9);
}

function a_6(a) {
  return M.chain(eff4(a._i), a_7, a_9);
}

function a_7(a, b) {
  a._i = b;
  return M.repeat(a_3, a_9);
}

function a_8(a) {
  return M.pure();
}

function a_9(a, e) {
  return M.raise(e);
}