function a() {
  var a = M.context();
  return M.chain(test(1), a_1, a_3);
}

function a_1(a, b) {
  if (b) {
    return M.chain(eff(3), a_2, a_3);
  } else {
    return M.chain(eff(5), a_2, a_3);
  }
}

function a_2(a) {
  return M.pure();
}

function a_3(a, e) {
  return M.raise(e);
}