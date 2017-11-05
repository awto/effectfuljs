function a() {
  var a = M.context();
  return M.chain(eff(), a_1, a_6);
}

function c() {
  var c = M.context();
  return M.chain(eff(1), c_1, c_7);
}

function a_1(a, b) {
  a._pat = b;
  return M.chain(effC(1), a_2, a_6);
}

function a_2(a, b) {
  if (a._pat === b) {
    return M.chain(effR(1), a_5, a_6);
  } else {
    return M.chain(effC(2), a_3, a_6);
  }
}

function a_3(a, b) {
  if (a._pat === b) {
    return M.chain(effR(2), a_4, a_6);
  } else {
    return M.jump(a_4, a_6);
  }
}

function a_4(a) {
  return M.chain(effR('default'), a_5, a_6);
}

function a_5(a) {
  return M.pure();
}

function a_6(a, e) {
  return M.raise(e);
}

function c_1(c, a) {
  c._pat = a;
  return M.chain(eff(2), c_2, c_7);
}

function c_2(c, a) {
  if (c._pat === a) {
    return M.chain(eff(3), c_3, c_7);
  } else {
    return M.jump(c_3, c_7);
  }
}

function c_3(c) {
  return M.chain(eff(4), c_4, c_7);
}

function c_4(c, a) {
  if (c._pat === a) {
    return M.chain(eff(5), c_6, c_7);
  } else {
    if (c._pat === 6) {
      return M.chain(eff(7), c_5, c_7);
    } else {
      return M.jump(c_5, c_7);
    }
  }
}

function c_5(c) {
  if (c._pat === 8) {
    console.log(9);
  }

  return M.chain(eff(10), c_6, c_7);
}

function c_6(c) {
  return M.pure();
}

function c_7(c, e) {
  return M.raise(e);
}