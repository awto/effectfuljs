function a() {
  var _a = M.context();

  return M.scopeH(a_1, a_5);
}

function a_1(_a) {
  return M.chainBH(eff1(), a_2, a_5);
}

function a_2(_a) {
  if (a) {
    return M.chainBH(eff5(5), a_4, a_5);
  } else {
    return M.chainBH(eff6(), a_3, a_5);
  }
}

function a_3(_a) {
  return M.pure(_a._r);
}

function a_4(_a, r) {
  return M.pure(r);
}

function a_5(_a, e) {
  return M.raise(e);
}