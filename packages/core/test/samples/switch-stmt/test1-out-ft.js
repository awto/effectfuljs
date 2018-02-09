import * as M from '@effectful/core';

function a() {
  var a = M.context();
  return M.scopeH(a_1, a_7);
}

function c() {
  var c = M.context();
  return M.scopeH(c_1, c_8);
}

function a_1(a) {
  return M.chainBH(eff(), a_2, a_7);
}

function a_2(a, b) {
  a._pat = b;
  return M.chainBH(effC(1), a_3, a_7);
}

function a_3(a, b) {
  if (a._pat === b) {
    return M.chainBH(effR(1), a_6, a_7);
  } else {
    return M.chainBH(effC(2), a_4, a_7);
  }
}

function a_4(a, b) {
  if (a._pat === b) {
    return M.chainBH(effR(2), a_5, a_7);
  } else {
    return M.jumpH(a_5, a_7);
  }
}

function a_5(a) {
  return M.chainBH(effR('default'), a_6, a_7);
}

function a_6(a) {
  return M.pure();
}

function a_7(a, e) {
  return M.raise(e);
}

function c_1(c) {
  return M.chainBH(eff(1), c_2, c_8);
}

function c_2(c, a) {
  c._pat = a;
  return M.chainBH(eff(2), c_3, c_8);
}

function c_3(c, a) {
  if (c._pat === a) {
    return M.chainBH(eff(3), c_4, c_8);
  } else {
    return M.jumpH(c_4, c_8);
  }
}

function c_4(c) {
  return M.chainBH(eff(4), c_5, c_8);
}

function c_5(c, a) {
  if (c._pat === a) {
    return M.chainBH(eff(5), c_7, c_8);
  } else {
    if (c._pat === 6) {
      return M.chainBH(eff(7), c_6, c_8);
    } else {
      return M.jumpH(c_6, c_8);
    }
  }
}

function c_6(c) {
  if (c._pat === 8) {
    console.log(9);
  }

  return M.chainBH(eff(10), c_7, c_8);
}

function c_7(c) {
  return M.pure();
}

function c_8(c, e) {
  return M.raise(e);
}