function a() {
  var _a = M.context();

  return M.chain(eff1(), a_1, a_4);
}

function a_1(_a) {
  if (a) {
    return M.chain(eff5(5), a_3, a_4);
  } else {
    return M.chain(eff6(), a_2, a_4);
  }
}

function a_2(_a) {
  return M.pure(_a._r);
}

function a_3(_a, r) {
  return M.pure(r);
}

function a_4(_a, e) {
  return M.raise(e);
}