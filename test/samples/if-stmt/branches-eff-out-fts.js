// *- when branches has effects and it is the last statement
function a() {
  if (true) return a_1();else {
    return M.jB(eff(2), a_3);
  }
}

function b() {
  if (true) return b_1();else {
    return M.jB(eff(2), b_3);
  }
}

function c() {
  if (true) return c_1();else {
    return M.j(eff(2), c_2);
  }
}

function d() {
  return M.j(eff('a'), d_1);
}

function e() {
  return M.jB(eff(1), e_1);
}

function f() {
  return M.jB(eff(1), f_1);
}

function a_1() {
  return M.jB(eff(1), a_2);
}

function a_2(a) {
  return M.pure(a);
}

function a_3(a) {
  return M.pure(a);
}

function a_4() {
  return M.pure();
}

function b_1() {
  return M.jB(eff(1), b_2);
}

function b_2(a) {
  return M.pure(a);
}

function b_3(a) {
  return M.pure(a);
}

function b_4() {
  return M.j(eff(3), b_5);
}

function b_5() {
  return M.j(eff(4), b_6);
}

function b_6() {
  return M.pure();
}

function c_1() {
  return M.j(eff(1), c_2);
}

function c_2() {
  return M.j(eff(3), c_3);
}

function c_3() {
  return M.j(eff(4), c_4);
}

function c_4() {
  return M.pure();
}

function d_1() {
  if (true) return d_2();else {
    return M.j(eff(2), d_3);
  }
}

function d_2() {
  return M.j(eff(1), d_3);
}

function d_3() {
  return M.j(eff(3), d_4);
}

function d_4() {
  return M.j(eff(4), d_5);
}

function d_5() {
  return M.pure();
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
  return M.j(eff(2), e_4);
}

function e_4() {
  return M.pure();
}

function f_1(a) {
  if (a) return f_2();else {
    return M.pure(2);
  }
}

function f_2() {
  return M.pure(1);
}

function f_3() {
  return M.pure();
}