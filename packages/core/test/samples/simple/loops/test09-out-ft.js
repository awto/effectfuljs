function _a() {
  var a1 = M.context();
  return M.scopeH(a_1, a_6);
}

function a_1(a1) {
  return M.chainBH(init(), a_2, a_6);
}

function a_2(a1, a) {
  a1._i = a;
  return M.jumpH(a_3, a_6);
}

function a_3(a1) {
  return M.chainBH(check(), a_4, a_6);
}

function a_4(a1, a) {
  if (a === true) {
    if (_a) {
      return M.chainBH(eff(1), a_5, a_6);
    } else {
      return M.jumpRH(a_5, a_6);
    }
  } else {
    return M.pure();
  }
}

function a_5(a1) {
  return M.chainBH(upd(), a_3, a_6);
}

function a_6(a1, e) {
  return M.raise(e);
}