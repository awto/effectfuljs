function a() {
  return M.chain(eff(1), a_1, a_3);
}

function a_1(a) {
  if (a) {
    return M.chain(eff(2), a_2, a_3);
  } else {
    return M.chain(eff(3), a_2, a_3);
  }
}

function a_2(r) {
  return M.pure(r);
}

function a_3(e) {
  return M.raise(e);
}