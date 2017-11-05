function a() {
  var a = M.context();
  return M.chain(eff1(), a_1, a_7);
}

function a_1(a) {
  return M.chain(eff2(), a_2, a_7);
}

function a_2(a) {
  return M.chain(eff(3), a_3, a_7);
}

function a_3(a, b) {
  if (b) {
    return M.chain(eff5(), a_4, a_7);
  } else {
    return M.chain(eff7(), a_6, a_7);
  }
}

function a_4(a) {
  return M.chain(eff6(), a_5, a_7);
}

function a_5(a) {
  return M.repeat(eff4(), a_2, a_7);
}

function a_6(a) {
  return M.pure();
}

function a_7(a, e) {
  return M.raise(e);
}