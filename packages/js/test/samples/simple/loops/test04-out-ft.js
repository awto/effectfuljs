function a() {
  var a = M.context();
  return M.scopeH(a_1, a_8);
}

function a_1(a) {
  return M.chainBH(eff1(), a_2, a_8);
}

function a_2(a) {
  return M.chainBH(eff2(), a_3, a_8);
}

function a_3(a, b) {
  a._i = b;
  return M.jumpH(a_4, a_8);
}

function a_4(a) {
  if (a._i < 10) {
    return M.chainBH(eff3(a._i, a._j), a_5, a_8);
  } else {
    return M.chainBH(eff7(a._i), a_7, a_8);
  }
}

function a_5(a) {
  var b;
  b = a._j++;
  return M.chainBH(eff4(b), a_6, a_8);
}

function a_6(a) {
  a._i++;
  return M.jumpRH(a_4, a_8);
}

function a_7(a) {
  return M.pure();
}

function a_8(a, e) {
  return M.raise(e);
}