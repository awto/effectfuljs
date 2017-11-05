function a() {
  var _a = M.context();

  return M.chain(eff1(), a_1, a_3);
}

function a_1(_a) {
  if (a) {
    return M.pure(5);
  } else {
    return M.chain(eff6(), a_2, a_3);
  }
}

function a_2(_a) {
  return M.pure(_a._r);
}

function a_3(_a, e) {
  return M.raise(e);
}