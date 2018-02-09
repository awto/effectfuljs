import * as M from '@effectful/core';

function a() {
  var a = M.context();
  return M.scopeH(a_1, a_10);
}

function a_1(a) {
  return M.chainBH(eff1(), a_2, a_10);
}

function a_2(a) {
  if (a1) {
    return M.chainBH(eff2(), a_3, a_10);
  } else {
    return M.jumpH(a_3, a_10);
  }
}

function a_3(a) {
  return M.chainBH(eff3(), a_4, a_10);
}

function a_4(a) {
  if (a2) {
    return M.chainBH(eff4(), a_5, a_10);
  } else {
    return M.jumpH(a_5, a_10);
  }
}

function a_5(a) {
  return M.chainBH(eff5(), a_6, a_10);
}

function a_6(a) {
  if (a3) {
    return M.chainBH(eff6(), a_7, a_10);
  } else {
    return M.jumpH(a_7, a_10);
  }
}

function a_7(a) {
  return M.chainBH(eff7(), a_8, a_10);
}

function a_8(a) {
  if (a4) {
    return M.chainBH(eff8(), a_9, a_10);
  } else {
    return M.pure();
  }
}

function a_9(a) {
  return M.pure();
}

function a_10(a, e) {
  return M.raise(e);
}