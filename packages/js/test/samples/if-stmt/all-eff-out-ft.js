function a() {
  var a = M.context();
  return M.chain(eff(1), a_1, a_3);
}

function a_1(a, b) {
  if (b) {
    return M.chain(eff(2), a_2, a_3);
  } else {
    return M.chain(eff(3), a_2, a_3);
  }
}

function a_2(a, r) {
  return M.pure(r);
}

function a_3(a, e) {
  return M.raise(e);
}