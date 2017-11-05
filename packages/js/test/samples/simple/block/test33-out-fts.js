function a() {
  return M.chain(eff(1), a_1, a_5);
}

function a_1() {
  return M.chain(eff(2), a_2, a_5);
}

function a_2(a) {
  if (a) {
    return M.chain(eff3(), a_3, a_5);
  } else {
    b;
    return M.pure();
  }
}

function a_3() {
  return M.chain(eff4(), a_4, a_5);
}

function a_4() {
  return M.pure();
}

function a_5(e) {
  return M.raise(e);
}