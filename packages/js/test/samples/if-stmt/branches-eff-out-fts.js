// *- when branches has effects and it is the last statement
function a() {
  if (true) {
    return M.chain(eff(1), a_1, a_2);
  } else {
    return M.chain(eff(2), a_1, a_2);
  }
}

function b() {
  if (true) {
    return M.chain(eff(1), b_1, b_2);
  } else {
    return M.chain(eff(2), b_1, b_2);
  }
}

function c() {
  if (true) {
    return M.chain(eff(1), c_1, c_4);
  } else {
    return M.chain(eff(2), c_1, c_4);
  }
}

function d() {
  return M.chain(eff('a'), d_1, d_5);
}

function e() {
  return M.chain(eff(1), e_1, e_2);
}

function f() {
  return M.chain(eff(1), f_1, f_2);
}

function a_1(r) {
  return M.pure(r);
}

function a_2(e) {
  return M.raise(e);
}

function b_1(r) {
  return M.pure(r);
}

function b_2(e) {
  return M.raise(e);
}

function c_1() {
  return M.chain(eff(3), c_2, c_4);
}

function c_2() {
  return M.chain(eff(4), c_3, c_4);
}

function c_3() {
  return M.pure();
}

function c_4(e) {
  return M.raise(e);
}

function d_1() {
  if (true) {
    return M.chain(eff(1), d_2, d_5);
  } else {
    return M.chain(eff(2), d_2, d_5);
  }
}

function d_2() {
  return M.chain(eff(3), d_3, d_5);
}

function d_3() {
  return M.chain(eff(4), d_4, d_5);
}

function d_4() {
  return M.pure();
}

function d_5(e) {
  return M.raise(e);
}

function e_1(a) {
  if (a) {
    return M.pure(1);
  } else {
    return M.pure(2);
  }
}

function e_2(e) {
  return M.raise(e);
}

function f_1(a) {
  if (a) {
    return M.pure(1);
  } else {
    return M.pure(2);
  }
}

function f_2(e) {
  return M.raise(e);
}