function a() {
  var a = M.context();

  if (true) {
    1 + 1;
  }

  return M.chain(M.pure(), a_1, a_2);
}

function a_1(a, r) {
  return M.pure(r);
}

function a_2(a, e) {
  return M.raise(e);
}