function a() {
  var a = M.context();
  return M.scopeH(a_1, a_6);
}

function a_1(a) {
  return M.chainBH(eff(1), a_2, a_6);
}

function a_2(a, b) {
  a._pat = b;
  return M.chainBH(check(1), a_3, a_6);
}

function a_3(a, b) {
  if (a._pat === b) {
    return M.chainBH(effB(1), a_5, a_6);
  } else {
    return M.chainBH(check(2), a_4, a_6);
  }
}

function a_4(a, b) {
  if (a._pat === b) {
    return M.chainBH(effB(2), a_5, a_6);
  } else {
    return M.chainBH(effB(3), a_5, a_6);
  }
}

function a_5(a) {
  return M.pure();
}

function a_6(a, e) {
  return M.raise(e);
}