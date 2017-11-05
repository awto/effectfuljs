function a() {
  return M.chain(eff1(), a_1, a_7);
}

function a_1() {
  return M.chain(eff2(), a_2, a_7);
}

function a_2() {
  return M.chain(eff(3), a_3, a_7);
}

function a_3(a) {
  if (a) {
    return M.chain(eff5(), a_4, a_7);
  } else {
    return M.chain(eff7(), a_6, a_7);
  }
}

function a_4() {
  return M.chain(eff6(), a_5, a_7);
}

function a_5() {
  return M.repeat(eff4(), a_2, a_7);
}

function a_6() {
  return M.pure();
}

function a_7(e) {
  return M.raise(e);
}