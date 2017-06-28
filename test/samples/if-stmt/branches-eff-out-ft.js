function a_1() {
  return eff(1);
}

function b_1() {
  return eff(1);
}

function b_2() {
  return M.jM(eff(3), b_3);
}

function b_3() {
  return eff(4);
}

function c_1() {
  return M.jM(eff(1), c_2);
}

function c_2() {
  return M.jM(eff(3), c_3);
}

function c_3() {
  return eff(4);
}

function d_1() {
  if (true) return d_2();else {
    return M.jM(eff(2), d_3);
  }
}

function d_2() {
  return M.jM(eff(1), d_3);
}

function d_3() {
  return M.jM(eff(3), d_4);
}

function d_4() {
  return eff(4);
}

function e_1(a) {
  if (a) return e_2();else {
    return M.pure(2);
  }
}

function e_2() {
  return M.pure(1);
}

function e_3() {
  return eff(2);
}

function f_1(a) {
  if (a) return f_2();else {
    return M.pure(2);
  }
}

function f_2() {
  return M.pure(1);
}

// *- when branches has effects and it is the last statement
function a() {
  if (true) return a_1();else {
    return eff(2);
  }
}

function b() {
  if (true) return b_1();else {
    return eff(2);
  }
}

function c() {
  if (true) return c_1();else {
    return M.jM(eff(2), c_2);
  }
}

function d() {
  return M.jM(eff('a'), d_1);
}

function e() {
  return M.jMB(eff(1), e_1);
}

function f() {
  return M.jMB(eff(1), f_1);
}