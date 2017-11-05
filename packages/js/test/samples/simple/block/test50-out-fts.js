function a() {
  return M.chain(test(1), a_1, a_3);
}

function a_1(a) {
  if (a) {
    return M.chain(eff(3), a_2, a_3);
  } else {
    return M.chain(eff(5), a_2, a_3);
  }
}

function a_2() {
  return M.pure();
}

function a_3(e) {
  return M.raise(e);
}