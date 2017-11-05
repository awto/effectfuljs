function a() {
  return M.chain(eff1(), a_1, a_3);
}

function a_1() {
  if (a) {
    return M.pure(5);
  } else {
    return M.chain(eff6(), a_2, a_3);
  }
}

function a_2() {
  var r;
  return M.pure(r);
}

function a_3(e) {
  return M.raise(e);
}